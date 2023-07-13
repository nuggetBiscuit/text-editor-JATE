const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new WebpackPwaManifest({
        filename: "manifest.json",
        name: "Just another text Editor",
        short_name: "JATE",
        description:
          "A javascript text editor that you can run in your browser. Even when you are offline",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes for different devices
            destination: "/",
          },
        ],
        theme_color: "#31a9e1",
        background_color: "#222222",
        display: "standalone",
        start_url: "/",
        publicPath: "/",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html", // Path to your HTML template file
        filename: "index.html", // Output HTML file name
      }),
      new InjectManifest({
        swSrc: "./src-sw.js", // Path to your service worker file
        swDest: "src-sw.js", // Output service worker file name
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/",
              },
            },
          ],
        },
      ],
    },
  };
};
