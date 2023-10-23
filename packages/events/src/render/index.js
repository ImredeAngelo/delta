// import app from "@deltahouse/app";
// import ReactDOMServer from "react-dom/server";
import htmlTemplate from "./template.ejs";
import template from "lodash/template";

// TODO: When event is created -> Generate static page for 
module.exports = (req, res) => {
    const html = template(htmlTemplate)({
        title: "Hello World",
        short_description: "yes",
        banner: "/banner.jpg",
        app: "Hello World!"
    });

    res.status(200).send(html);
}