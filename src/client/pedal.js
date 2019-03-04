import Router from "preact-router";
import { h, render } from "preact";
import Search from "Components/Search";
import PedalDetail from "Components/PedalDetail";
import Favorites from "Components/Favorites";
import "Styles/Global.css";

render(<Router>
  <Search path="/" />
  <PedalDetail default path="/pedal/:id" />
  <Favorites path="/favorites" />
</Router>, document.getElementsByTagName("body")[0], document.getElementById("app"));
