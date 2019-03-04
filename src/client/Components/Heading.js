import { h, render } from "preact";
import "Styles/Heading.css";

export default props => (
  <header className="heading">
    {props.children}
  </header>
);
