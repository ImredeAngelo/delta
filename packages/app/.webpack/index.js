// Plugins
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin')
const ImageminAvifPlugin = require('imagemin-avif-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

// Helpers
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')

// Rules
const resources = require('./rules/resource');
const transpile = require('./rules/transpile');
const templates = require('./rules/source');
const styles = require('./rules/style');

// Development build
const dev = (options) => { 
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
    
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(options.dir, `./dist/${options.name}`)
        },
        devServer: {
            static: path.resolve('./', './public'),
            hot: true,
            server: options.server,
            allowedHosts: 'all',
            host: options.host,
            port: options.port,
            historyApiFallback: true,
            client: {
                webSocketURL: {
                    hostname: options.host,
                    pathname: '/ws',
                    port: options.port,
                    protocol: 'ws'
                },
            },
        },
        plugins: [
            new BundleAnalyzerPlugin({ openAnalyzer: false }),
            new HtmlWebpackPlugin({
                // filename:'index.html',
                favicon: 'public/favicon.ico',
                template: 'index.ejs',
                templateParameters: {
                    title: options.template.title,
                    'bundle': '/bundle.js',
                    'stylesheet': '/main.css',
                    'app': '',
                    ...options.template
                },
            }),
            new ImageminWebpPlugin({
                config:[{
                    test: /\.(jpe?g|png)$/i,
                    options: {
                        quality:  75
                    }
                }],
                overrideExtension: false,
            }),
            new ReactRefreshPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
        ],
        // Ignore workbox warnings and files generated
        stats: {
            warningsFilter: [
                '--watch',
                'maximumFileSizeToCacheInBytes'
            ],
            // assets: false,
            // chunks: false,
            // hash: false,
            // modules: false,
            // version: false,
            // timings: true
        }
    }
}

// Production build
const prod = (options) => { return {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(options.dir, `./build/${options.name}`)
    },
    plugins: [
        // new BundleAnalyzerPlugin({ openAnalyzer: false }), // TODO: Check if CI
        new WorkboxPlugin.GenerateSW({
            swDest: 'worker.js',
            navigateFallback: '/',
            maximumFileSizeToCacheInBytes: 20971520
        }),
        new ImageminWebpPlugin({
            config:[{
                test: /\.(jpe?g|png)$/i,
                options: {
                    quality:  75
                }
            }],
            overrideExtension: false,
        }),
        new ImageminAvifPlugin({
            config:[{
                test: /\.(jpe?g|png)$/i,
                options: {
                    quality:  85
                }
            }],
            overrideExtension: false,
        }),
		new CopyPlugin({
            patterns: [
                "public"
            ],
        }),
		// new (require('static-site-generator-webpack-plugin'))({
        //     globals: { window: {}, isStatic: true, template:options.template, platform:'' },
        //     paths: options.paths,
        // }),
        new (require('html-webpack-plugin'))({
            // filename:'index.html',
            favicon: 'public/favicon.ico',
            template: 'index.ejs',
            templateParameters: {
                title: options.template.title,
                'bundle': '/bundle.js',
                'stylesheet': '/main.css',
                'app': '',
                ...options.template
            },
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
}}

// Config shared between production and development
const shared = (options) => { return {
    target: 'web',
    entry: options.entry,
    output: {
        assetModuleFilename: '[name][ext][query]',
        filename: 'bundle.js',
        libraryTarget: 'umd',
        globalObject: 'this',
        publicPath: '/'
    },
    module: {
        rules: [
            resources(),
            templates(),
            transpile(options.isDev),
            styles(options.isDev ? options.accessibility.colorblind : '', MiniCssExtractPlugin.loader)
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CompressionPlugin({
            test: /\.(js|css|html)?$/i,
            algorithm: 'gzip',
        }),
        new CleanWebpackPlugin()
    ]
}}

/**
 * React 18 Static Site Config
 * @param {string} options.entry webpack entry point
 * @param {string} options.mode webpack mode (development/production/none)
 * @param {string?} options.dir sub directory for assets
 * @returns {Object}
 */
module.exports = (options) => {
    const opt = {
        ...options,
        isDev:  options.mode == 'development',
        entry:  options.entry || './src/index.js',
        paths:  options.paths || ['/'],
        dir:    options.dir || './',
        host:   options.host || process.env.HOST || '0.0.0.0',
        port:   options.port || process.env.PORT || 4443,
        server: (options.secure || process.env.SECURE) ? 'https' : 'http',
        accessibility: {
            colorblind: options.color || ''
        }
    }

    return merge(shared(opt), opt.isDev ? dev(opt) : prod(opt))
}