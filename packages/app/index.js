import React, { StrictMode } from 'react'
import { BrowserRouter } from "react-router-dom"
import { StaticRouter } from "react-router-dom/server"
import { renderToString } from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { Workbox } from 'workbox-window'

import _ from 'lodash'
import html from './index.html'

import App from './src'

const devmode = (process.env.NODE_ENV == "development");

// Register service worker
function useServiceWorker() {
    if (!devmode && navigator.serviceWorker) {
        const wb = new Workbox('/worker.js');
        wb.register();
    }
}

// Render development build in strict mode
function render(path = "") {
    const app = (path == "") ? <BrowserRouter><App/></BrowserRouter> : <StaticRouter location={path}><App/></StaticRouter>; 
    return devmode ? <StrictMode>{app}</StrictMode> : app;
}

// Render app on client
function renderApp() {
    const container = document.getElementById('root') || document.body;
    const root = createRoot(container);

    root.render(render());
}

// Client-side entrypoint
if (typeof global.document !== 'undefined' && typeof window !== 'undefined') {
    useServiceWorker();
    renderApp();
}

// Static pre-rendered entrypoint
// TODO: Define in webpack
export default (locals) => {
	const compiled = _.template(html)
    return compiled({
		app: renderToString(render(locals.path)),
		bundle: './bundle.js',
		stylesheet: './main.css',
        ...template
	});
};
