import esbuild from "esbuild";
import ssgen from "./plugins/ssgen/index.mjs";

// import render from "../render.js";
// const { htmlPlugin } = require('@craftamap/esbuild-plugin-html');

esbuild.build({
    entryPoints: ['bundle.jsx'], // Called from package.json
    bundle: true,
    metafile: true,
    sourcemap: true,
    // logLevel: 'verbose',
    // outfile: 'build/bundle.js',
    outdir: 'build',
    // platform: 'node',
    format: 'esm',
    // format: 'cjs',
    loader: {
        '.ejs': 'text',
        '.js': 'jsx',
        '.pcss': 'empty',
        '.css': 'empty',
        '.png': 'empty'
    },
    plugins: [
        ssgen({
            render: '../render.js',
            template: {
                title: 'Delta Linjeforening',
                short_description: 'Delta er linjeforeningen for studentene ved Matematiske fag og Fysikk på NTNU, og drives av studenter ved disse studiene. Linjeforeningen organiserer arrangementer på stor og liten skala, har et eget identitetsareal, tilbyr faglige ressurser, skaper kontakt med arbeidslivet, og tilbyr et bredt utvalg aktiviteter i komiteene sine.',
                description: 'Delta er linjeforeningen for studentene ved Matematiske fag og Fysikk på NTNU, og drives av studenter ved disse studiene. Linjeforeningen organiserer arrangementer på stor og liten skala, har et eget identitetsareal, tilbyr faglige ressurser, skaper kontakt med arbeidslivet, og tilbyr et bredt utvalg aktiviteter i komiteene sine.',
            }
        })
    ],
})
.then(() => console.log("⚡ Compiled."))
.catch(e => {
    console.error(e);
    return process.exit(1);
});