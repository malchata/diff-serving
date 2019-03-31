import { h, render } from "preact";
import PedalImage from "Components/PedalImage";

export default props => {
  const { id, manufacturer, model, type } = props;

  return <li className="pedal__list-item">
    <a className="pedal__link" href={`/pedal/${id}`}>
      <PedalImage id={id} manufacturer={manufacturer} model={model} />
      <h3>{manufacturer} {model}</h3>
      <h4>{type}</h4>
    </a>
  </li>;
};
