import { h, render } from "preact";

export default props => {
  const { id, manufacturer, model } = props;

  return <picture>
    <source srcset={`/images/${id}-2x.webp 2x, /images/${id}-1x.webp 1x`} type="image/webp" />
    <img src={`/images/${id}-1x.jpg`} srcset={`/images/${id}-2x.jpg 2x, /images/${id}-1x.jpg 1x`} alt={`${manufacturer} ${model}`} />
  </picture>;
};
