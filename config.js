const express = require("express");
const path = require("path");
const errorHandler = require("errorhandler");

module.exports = (() => {
    const app = express();
    const port = 3000;

    app.set("port", port);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");

    app.use(express.static(path.join(__dirname, "public")));
    app.use(errorHandler());

    app.listen(port, () => {
        console.log(`Floema listening at http://localhost:${port}`);
    });

    return app;
})();
