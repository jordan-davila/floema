const express = require("express");
const path = require("path");
const logger = require("morgan");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const staticify = require("staticify")(path.join(__dirname, "public"));

module.exports = (() => {
    const app = express();
    const port = 3000;

    app.set("port", port);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");

    app.use(logger("dev"));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(methodOverride());

    app.use(express.static(path.join(__dirname, "public")));

    app.use(errorHandler());
    app.use(staticify.middleware);
    app.locals.getVersionedPath = staticify.getVersionedPath;

    app.listen(port, () => {
        console.log(`Floema listening at http://localhost:${port}`);
    });

    return app;
})();
