/* eslint-env node */

// Built-ins
const path = require("path");

// webpack-specific
const AssetsWebpackPlugin = require("assets-webpack-plugin");
const WebpackNodeExternals = require("webpack-node-externals");

// Config helpers
const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const src = (...args) => path.join(__dirname, "src", ...args);
const dist = (...args) => path.join(__dirname, "dist", ...args);

// We need a single instance of `AssetsWebpackPlugin` so all builds share the
// same manifest. This is essential for getting differential serving to work.
const assetsPluginInstance = new AssetsWebpackPlugin({
  filename: "assets.json",
  path: dist("server"),
  update: true
});

// Options common between both legacy and modern client configs.
const commonClientConfig = {
  mode,
  entry: {
    "home": src("client", "home.js"),
    "pedal": src("client", "pedal.js"),
    "favorites": src("client", "favorites.js")
  },
  devtool: "source-map",
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
          minChunks: 1
        }
      }
    }
  },
  plugins: [
    assetsPluginInstance
  ],
  // Because screen space may be at a minimum at the event, let's configure
  // the output to be as small as possible while still outputting needed info.
  stats: {
    exclude: /\.m?js\.map$/i,
    excludeAssets: /\.m?js\.map$/i,
    excludeModules: /\.m?js\.map$/i,
    builtAt: false,
    children: false,
    modules: false
  },
  resolve: {
    alias: {
      "Components": src("client", "Components"),
      "Utils": src("client", "Utils")
    }
  }
};

// webpack configs
module.exports = [
  // client
  {
    name: "client",
    output: {
      filename: mode === "development" ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      chunkFilename: mode === "development" ? "js/[name].js" : "js/[name].[chunkhash:8].js",
      path: dist("client"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/i,
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
    ...commonClientConfig
  },
  // client-modern
  {
    name: "client-modern",
    output: {
      filename: mode === "development" ? "js/[name].mjs" : "js/[name].[chunkhash:8].mjs",
      chunkFilename: mode === "development" ? "js/[name].mjs" : "js/[name].[chunkhash:8].mjs",
      path: dist("client"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.m?js$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "clientModern"
              }
            }
          ]
        }
      ]
    },
    ...commonClientConfig
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
          test: /\.m?js$/i,
          exclude: /node_modules/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                envName: "server"
              }
            }
          ]
        }
      ]
    },
    // We're not doing any work with the server during the presentation, so we
    // don't really want to see debug info for it cluttering the screen.
    stats: {
      exclude: /\.m?js\.map$/i,
      excludeAssets: /\.m?js\.map$/i,
      excludeModules: /\.m?js\.map$/i,
      all: false
    },
    externals: [WebpackNodeExternals(), "assets"],
    resolve: {
      alias: {
        "Components": src("client", "Components"),
        "Utils": src("client", "Utils", "index.js"),
        "Html": src("client", "Html", "index.js")
      }
    }
  }
];
