/* eslint-env node */

// Built-ins
import { resolve } from "path";
import { readFile } from "fs";

// App-specific
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { pedals } from "./pedals.json";
import Html from "Html";
import { h, render, Component } from "preact";
import renderToString from "preact-render-to-string";
import { search } from "./helpers";

// Components
import Search from "Components/Search";
import PedalDetail from "Components/PedalDetail";

const app = express();
const port = process.env.PORT || 8080;

app.use(compression());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/js", express.static(resolve(process.cwd(), "dist", "client", "js")));
app.use("/css", express.static(resolve(process.cwd(), "dist", "client", "css")));
app.use("/images", express.static(resolve(process.cwd(), "dist", "client", "images")));

app.listen(port, async () => {
  console.log(`Up and running at http://localhost:${port}`);

  readFile(resolve(process.cwd(), "dist", "server", "assets.json"), (err, data) => {
    if (err) {
      throw err;
    }

    const assets = JSON.parse(data.toString());

    // Home/Search
    app.get("/", (req, res) => {
      res.set("Content-Type", "text/html");
      res.status(200);
      res.send(Html("Home", renderToString(<Search />), req.path, assets));
    });

    // Home/Search (with search query)
    app.post("/", (req, res) => {
      const searchResults = search(req.body.query, pedals, req.body.sortBy, req.body.sortOrder);

      res.set("Content-Type", "text/html");
      res.status(200);
      res.send(Html("Home", searchResults === false ? renderToString(<Search />) : renderToString(<Search searchResults={searchResults} sortBy={req.body.sortBy} sortOrder={req.body.sortOrder} searchQuery={req.body.query} />), req.path, assets));
    });

    // Favorites
    app.get("/pedal/:id", (req, res) => {
      let clean = {};
      const id = decodeURI(req.params.id);

      if (/^\d+$/i.test(id) === true) {
        clean.id = parseInt(id);
        const pedalData = pedals.filter(pedal => pedal.id === clean.id)[0];

        if (pedalData !== undefined) {
          const { manufacturer, model } = pedalData;

          res.set("Content-Type", "text/html");
          res.status(200);
          res.send(Html(`${manufacturer} ${model}`, renderToString(<PedalDetail pedalData={pedalData} />), req.path, assets));

          return;
        }
      }

      res.status(404);
      res.send("Pedal not found.");

      return;
    });

    // /api routes below
    app.get("/api/search/:query", (req, res) => {
      const searchResults = search(req.params.query, pedals);

      if (searchResults !== false) {
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send(JSON.stringify(searchResults));
      } else {
        res.status(422);
        res.send("Input invalid.");
      }
    });

    app.get("/api/pedal/:id", (req, res) => {
      let clean = {};
      const id = decodeURI(req.params.id.toLowerCase());

      if (/^\d+$/i.test(id) === true) {
        clean.id = parseInt(id);
        const pedal = pedals.filter(pedal => pedal.id === clean.id)[0];
        pedal.id = clean.id;
        res.set("Content-Type", "application/json");
        res.status(200);
        res.send(JSON.stringify(pedal));
      } else {
        res.status(422);
        res.send("Input invalid.");
      }
    });
  });
});
