import React from 'react';
import Server from 'react-dom/server';
import App from './src';

export default function render(options) {
    return Server.renderToString(<App/>);
}