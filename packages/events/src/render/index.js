// import app from "@deltahouse/app";
// import ReactDOMServer from "react-dom/server";

/**
 * 
 * TODO:
 *  - Short description when creating events
 */
// TODO: When event is created -> Generate static page for 
module.exports = (req, res) => {
    const html = "<h1>Hello world!</h1>";

    console.log("Result: ", html)

    res.status(200).send(html);
}