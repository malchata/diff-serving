import { h, render } from "preact";
import Router from "preact-router";
import Search from "Components/Search";
import PedalDetail from "Components/PedalDetail";
import Favorites from "Components/Favorites";

render(<Router>
  <Search path="/" />
  <PedalDetail path="/pedal/:id" />
  <Favorites default path="/favorites" />
</Router>, document.getElementsByTagName("body")[0], document.getElementById("app"));
