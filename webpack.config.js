const path = require("path");
const webpack = require("webpack");

const CopyWebPackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

const IS_DEVELOPMENT = process.env.NODE_ENV === "dev";

const dirApp = path.join(__dirname, "app");
const dirShared = path.join(__dirname, "shared");
const dirStyles = path.join(__dirname, "styles");
const dirNode = "node_modules";

module.exports = {
    entry: [path.join(dirApp, "index.js"), path.join(dirStyles, "index.scss")],

    resolve: {
        modules: [dirApp, dirShared, dirNode],
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT,
        }),

        // Automatically load modules instead of having to import or require them everywhere.
        // new webpack.ProvidePlugin({}),

        new CopyWebPackPlugin({
            patterns: [
                {
                    from: "./app/service-worker.js",
                    to: "",
                },
                {
                    from: "./offline.html",
                    to: "",
                    git,
                },
                {
                    from: "./shared",
                    to: "",
                },
            ],
        }),

        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),

        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 15 }],
                ],
            },
        }),
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: ["pug-loader"],
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|fnt|webp)$/,
                loader: "file-loader",
                options: {
                    name(file) {
                        return "[name].[hash].[ext]";
                    },
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: ImageMinimizerPlugin.loader,
                        options: {
                            severityError: "warning", // Ignore errors on corrupted images
                            minimizerOptions: {
                                plugins: ["gifsicle"],
                            },
                        },
                    },
                ],
            },
        ],
    },

    // optimization: {
    //     minimize: true,
    //     minimizer: [new TerserPlugin()],
    // },
};
