const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // tách biệt file css ra khỏi bundle, tăng tốc độ tải về
// const TerserPlugin = require("terser-webpack-plugin"); // minification bundle
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/dashboard.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
  },
  mode: "development",
  devServer: {
    port: 9000,
    contentBase: path.resolve(__dirname, "./dist"),
    index: "dashboard.html",
    historyApiFallback: {
      index: "dashboard.html",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            // plugins: ["@babel/plugin-proposal-class-properties"], //hhjghj
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    // new TerserPlugin(),
    new MiniCssExtractPlugin({ filename: "style.[contenthash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "dashboard.html",
      title: "dashboard",
    }),
    new ModuleFederationPlugin({
      name: "App",
      remotes: {
        HelloWorldApp: "HelloWorldApp@http://localhost:9001/remoteEntry.js",
        ImageApp: "ImageApp@http://localhost:9002/remoteEntry.js",
      },
    }),
  ],
};
