/* eslint-env node */

module.exports = {
  env: {
    client: {
      presets: [
        [
          "@babel/preset-env", {
            modules: false,
            corejs: 3,
            useBuiltIns: "usage",
            targets: "> 0.25%, IE > 10, Firefox ESR, not dead"
          }
        ],
        [
          "@babel/preset-react", {
            pragma: "h"
          }
        ]
      ],
      plugins: [
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
