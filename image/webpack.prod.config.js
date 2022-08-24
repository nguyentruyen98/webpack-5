const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // tách biệt file css ra khỏi bundle, tăng tốc độ tải về
// const TerserPlugin = require("terser-webpack-plugin"); // minification bundle prodct k cần vì tự có
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/image.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "http://localhost:9002/",
  },
  mode: "production",
  optimization: { splitChunks: { chunks: "all", minSize: 3000 } },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 2014,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
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
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    // new TerserPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "image.html",
      title: "Image",
      template: "src/page-template.hbs",
      description: "Image",
    }),
    new ModuleFederationPlugin({
      name: "ImageApp",
      filename: "remoteEntry.js",
      exposes: {
        "./KiwiPage": "./src/components/kiwi-page/kiwi-page.js",
      },
      remotes: {
        CaptionApp: "CaptionApp@http://localhost:9003/remoteEntry.js",
      },
    }),
  ],
};
