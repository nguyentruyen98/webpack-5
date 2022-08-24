const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // tách biệt file css ra khỏi bundle, tăng tốc độ tải về
// const TerserPlugin = require("terser-webpack-plugin"); // minification bundle
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
  entry: "./src/caption.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9003/",
  },
  mode: "development",
  devServer: {
    port: 9003,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
    devMiddleware: {
      index: "caption.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // new TerserPlugin(),
    // new MiniCssExtractPlugin({ filename: "style.[contenthash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello world",
      template: "src/page-template.hbs",
      description: "Hello world",
    }),
    new ModuleFederationPlugin({
      name: "CaptionApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Caption": "./src/components/caption/caption.js",
      },
    }),
  ],
};
