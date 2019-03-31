/* eslint-env node */

const devMode = process.env.NODE_ENV !== "production";

let plugins = [
  require("autoprefixer")({
    browsers: ["> 0.25%", "IE > 10", "Firefox ESR", "not dead"]
  })
];

if (devMode === false) {
  plugins.push(require("cssnano"));
}

module.exports = {
  plugins
};
