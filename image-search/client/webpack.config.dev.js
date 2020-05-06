"use strict";

const path = require("path");
const glob = require("glob");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: ["./app.js"],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["vue-style-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};