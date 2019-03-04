import { h, render } from "preact";
import "Styles/PedalList.css";

export default props => (
  <ul className="pedal-list">
    {props.children}
  </ul>
);
