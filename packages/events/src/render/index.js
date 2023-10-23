import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server"
import Event from "@deltahouse/app/src/pages/event";

import htmlTemplate from "./template.ejs";
import template from "lodash/template";

// TODO: When event is created -> Generate static page for 
module.exports = (req, res) => {
    // <StaticRouter location="/">
    const markup = ReactDOMServer.renderToString(
        <Event/>
    );
        {/* </StaticRouter> */}
    
    const html = template(htmlTemplate)({
        title: "Hello World",
        short_description: "yes",
        banner: "/banner.jpg",
        app: markup
    });

    res.status(200).send(markup);
}