import lodashTemplate from 'lodash/template.js'
import fs from 'node:fs/promises'

/**
 * TODO:
 *  - Allow paths of any syntax: /page, ./page, page, /page/, page/ etc. 
 *  - Inject all build.outputFiles resources automatically (css/js?)
 */

function make(build, options, path = "/") {
    return fs.readFile('index.html.ejs')
        .then(buffer => buffer.toString())
        .then(html => lodashTemplate(html)({
            ...options.template,
            app: 'x' // options.render({
            //     path: path
            // })
        }))
        .then(html => fs.writeFile(build.initialOptions.outdir + '/index.html', html))
}

export default (options) => {
    // Default options
    options = {
        // render: () => { return '' },
        paths: ['/'],
        ...options,
        template: {
            title: 'Title',
            short_description: 'Hello world',
            description: 'Very long description here',
            // TODO: Inject all files/links automatically
            bundle: './bundle.js',
            stylesheet: './main.css',
            ...options.template,
        },
    }

    import('../../../bundle.jsx')
        .then(() => console.log("hello world"))
    
    return {
        name: 'esbuild-ssgen',
        setup(build) {
            build.onStart(() => {
                if (!build.initialOptions.metafile) {
                    throw new Error('metafile is not enabled')
                }
                if (!build.initialOptions.outdir) {
                    throw new Error('outdir must be set')
                }
            }),
            build.onEnd(results => {
                console.log(results)

                for(let path in options.paths)
                    make(build, options, path)
            })
        },
    }
}