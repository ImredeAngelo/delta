const config = require('./.webpack');
const colors = require('./.webpack/accessibility').colors;

// ===== EXPORT
module.exports = (env, options) => [ 
    config({
        ...options,
        entry: '.',
        dir: '../../',
        name: 'deltahouse-app', // TODO: Get from package.json
        paths: ['/'],
        template: {
            'title':'Delta Linjeforening'
        },
        color: colors.normal
    })
]