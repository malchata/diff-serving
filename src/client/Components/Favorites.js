import { h, render, Component } from "preact";
import Heading from "Components/Heading";
import BackLink from "Components/BackLink";
import PedalList from "Components/PedalList";
import Pedal from "Components/Pedal";

export default class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state.pedals = [];
  }

  componentDidMount() {
    let favoritePedals = localStorage.getItem("favoritePedals");

    if (favoritePedals !== null) {
      let favoritePedalsArr = JSON.parse(favoritePedals);
      let pedals = [];

      favoritePedalsArr.forEach(pedal => {
        pedals.push(<Pedal id={pedal.id} manufacturer={pedal.manufacturer} model={pedal.model} type={pedal.type} />);
      });

      this.setState({
        pedals
      });
    }
  }

  render() {
    return (
      <section>
        <Heading>
          <BackLink href="/">←</BackLink>
          <h1>Favorite Pedals</h1>
        </Heading>
        <PedalList>
          {this.state.pedals}
        </PedalList>
        <p style={`display: ${this.state.pedals.length > 0 ? "none" : "block"}`}>Looks like you don't have any favorites. Maybe <a href="/">search for some</a>?</p>
      </section>
    );
  }
}
