// const tsconfig = require("esbuild-ts-paths");
const alias = require('esbuild-plugin-alias');
const path = require('path');

(async() => {
    await require("esbuild").build({
        entryPoints: ['src/index.js'],
        bundle: true,
        outfile: 'build/index.js',
        // outdir: 'build',
        platform: 'node',
        loader: {
            '.ejs': 'text',
            '.js': 'jsx',
            '.pcss': 'empty',
            '.css': 'empty',
            '.png': 'empty'
        },
        plugins: [
            // tsconfig()
            alias({
                '~components/text-editor/display': path.resolve(__dirname, '../app/src/components/text-editor/display/index.js'),
                '~components/navbar': path.resolve(__dirname, '../app/src/components/navbar/index.js'),
                '~components/footer': path.resolve(__dirname, '../app/src/components/footer/index.js'),
                '~components/user': path.resolve(__dirname, '../app/src/components/user/index.js'),
                '~pages/register': path.resolve(__dirname, '../app/src/pages/register/index.js'),
                '~pages/home': path.resolve(__dirname, '../app/src/pages/home/index.js'),
                '~pages/event': path.resolve(__dirname, '../app/src/pages/event/index.js'),
                '~pages/new-event': path.resolve(__dirname, '../app/src/pages/new-event/index.js'),
                '~style': path.resolve(__dirname, '../app/src/style/index.js'),
                '~api': path.resolve(__dirname, '../app/src/api/index.js'),
            })
        ],
        // watch: true
    })
    .then(() => console.log("⚡ Compiled."))
    .catch(console.error);
})();