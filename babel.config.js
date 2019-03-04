/* eslint-env node */

module.exports = {
  env: {
    client: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            useBuiltIns: "usage",
            targets: "> 0.25%, last 2 versions, Firefox ESR, not dead"
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h"
          }
        ]
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-syntax-dynamic-import"
      ]
    },
    server: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            targets: {
              node: "current"
            }
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h"
          }
        ]
      ]
    }
  }
};
