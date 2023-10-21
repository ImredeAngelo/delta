import React, { StrictMode, lazy } from 'react'
import { BrowserRouter } from "react-router-dom"
import { StaticRouter } from "react-router-dom/server"
import { renderToString } from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { Workbox } from 'workbox-window'

// import _ from 'lodash'
import html from '!!raw-loader!./index.ejs'

import App from './src'

const _ = lazy(() => import("lodash"))

// Register service worker
function useServiceWorker() {
    if (PRODUCTION && navigator.serviceWorker) {
        const wb = new Workbox('/worker.js');
        wb.register();
    }
}

// Render development build in strict mode
function render(path = "") {
    const app = (path == "") ? <BrowserRouter><App/></BrowserRouter> : <StaticRouter location={path}><App/></StaticRouter>; 
    return (PRODUCTION || IGNORE_STRICT_MODE) ? app : <StrictMode>{app}</StrictMode>;
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
