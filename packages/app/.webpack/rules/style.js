module.exports = (colorblind, loader) => { return {
    test: /\.(c|pc|postc|sc|sa)ss$/,
    use: [
        {
            loader: loader
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 1,
                esModule: false,
                modules: {
                    localIdentName: '[name]-[local]'
                },
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    // syntax: 'postcss-scss',
                    plugins: [
                        (colorblind != '') && require("postcss-colorblind")({ method: colorblind }),
                        require("postcss-import-ext-glob"),
                        require("postcss-import"),
                        require("@csstools/postcss-global-data")({
                            files: [
                                'src/style/config.pcss'
                            ]
                        }),
                        require("postcss-css-variables"),
                        require("postcss-custom-media"),
                        require("postcss-inline-svg"),
                        require("cssnano")({ preset: ['default', { svgo: false }, { discardComments: { removeAll: true }}]}),
                        require("postcss-preset-env"),
                    ].filter(Boolean)
                }
            }
        }
    ]
}}