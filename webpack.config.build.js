const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
    mode: "production",
    output: {
        path: path.join(__dirname, "public"),
        hotUpdateChunkFilename: "hot/hot-update.js",
        hotUpdateMainFilename: "hot/hot-update.json",
    },
    plugins: [new CleanWebpackPlugin()],
});
