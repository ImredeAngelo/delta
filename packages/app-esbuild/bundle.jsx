import React from 'react'
import Server from 'react-dom/server' // TODO: Exclude from bundle
import { hydrateRoot } from 'react-dom/client'

import App from './src'


hydrateRoot(document.getElementById('root'), <App/>)


// Static-Site
export default function(options) {
    return Server.renderToString(<App/>);
}