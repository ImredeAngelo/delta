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
                    // plugins: [
                    //     // (colorblind != '') && [ "postcss-colorblind", { method: colorblind }],
                    //     // [ "postcss-import-ext-glob" ],
                    //     // [ "postcss-simple-vars", { silent: false } ],
                    //     // [ "postcss-inline-svg" ],
                    //     // [ "cssnano", { preset: ['default', { svgo: false }, { discardComments: { removeAll: true }}]}],
                    //     // [ "postcss-preset-env" ],
                    // ].filter(Boolean)
                }
            }
        }
    ]
}}