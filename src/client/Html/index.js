export default function (title, body, path, assets) {
  let js = [assets.commons.js];

  if (path.indexOf("favorites") !== -1) {
    js.push(assets.favorites.js);
  } else if (path.indexOf("pedal") !== -1) {
    js.push(assets.pedal.js);
  } else {
    js.push(assets.home.js);
  }

  return `
    <!DOCTYPE html>
    <html class="no-js" lang="en" dir="ltr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>
          StompList - ${title}
        </title>
        <script>document.documentElement.classList.remove("no-js")</script>
        <link rel="preconnect" href="https://polyfill.io/" crossorigin>
        <link rel="dns-prefetch" href="https://polyfill.io/">
        <link href="/css/styles.css" rel="stylesheet">
      </head>
      <body>
        <main id="app">${body}</main>
        <script src="https://polyfill.io/v3/polyfill.min.js?features=fetch"></script>
        ${js.map(src => `<script src=${src}></script>`).join("")}
      </body>
    </html>`;
}
