/* eslint-env node */

// Built-ins
const path = require("path");

// webpack-specific
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AssetsWebpackPlugin = require("assets-webpack-plugin");
const WebpackNodeExternals = require("webpack-node-externals");

// Config helpers
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const src = (...args) => path.join(__dirname, "src", ...args);
const dist = (...args) => path.join(__dirname, "dist", ...args);

// webpack configs
module.exports = [
  // client
  {
    name: "client",
    mode,
    entry: {
      "home": src("client", "home.js"),
      "pedal": src("client", "pedal.js"),
      "favorites": src("client", "favorites.js")
    },
    devtool: "source-map",
    output: {
      filename: mode === "development" ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      chunkFilename: mode === "development" ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      path: dist("client"),
      publicPath: "/"
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /node_modules/i,
            chunks: "all"
          },
          commons: {
            name: "commons",
            chunks: "initial",
            minChunks: 2
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader"
          ],
        },
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "client"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: path.join("css", mode === "development" ? "[name].css" : "[name].[hash:8].css")
      }),
      new AssetsWebpackPlugin({
        manifestFirst: true,
        filename: "assets.json",
        path: dist("server")
      })
    ],
    stats: {
      exclude: /\.(m?js|css)\.map$/i,
      excludeAssets: /\.(m?js|css)\.map$/i,
      excludeModules: /\.(m?js|css)\.map$/i
    },
    resolve: {
      alias: {
        "Components": src("client", "Components"),
        "Utils": src("client", "Utils"),
        "Styles": src("client", "Styles")
      }
    }
  },
  // server
  {
    name: "server",
    target: "node",
    mode,
    entry: {
      "server": src("server", "index.js")
    },
    output: {
      filename: "server.js",
      path: dist("server"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "server"
              }
            }
          ]
        },
        {
          test: /\.css$/i,
          use: [
            "null-loader"
          ]
        },
      ]
    },
    externals: [WebpackNodeExternals(), "assets"],
    resolve: {
      alias: {
        "Components": src("client", "Components"),
        "Utils": src("client", "Utils", "index.js"),
        "Html": src("client", "Html", "index.js"),
        "Styles": src("client", "Styles")
      }
    }
  }
];
