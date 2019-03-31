import { h, render, Component } from "preact";
import PedalList from "Components/PedalList";
import Pedal from "Components/Pedal";
import { simpleSort } from "Utils";

export default class Search extends Component {
  constructor(props) {
    super(props);

    let pedals = [];
    let searchQuery = this.props.searchQuery || "";
    let sortOrder = "asc";
    let sortBy = "manufacturer";

    if ("searchResults" in this.props) {
      for (let result in this.props.searchResults) {
        const pedal = this.props.searchResults[result];
        pedals.push(<Pedal id={pedal.id} manufacturer={pedal.manufacturer} model={pedal.model} type={pedal.type} />);
      }
    }

    if ("sortOrder" in this.props) {
      if (/^(asc|desc)$/i.test(this.props.sortOrder) === true) {
        sortOrder = this.props.sortOrder;
      }
    }

    if ("sortBy" in this.props) {
      if (/^(model|type|manufacturer)$/i.test(this.props.sortBy) === true) {
        sortBy = this.props.sortBy;
      }
    }

    this.state.searchQuery = searchQuery;
    this.state.sortOrder = sortOrder;
    this.state.sortBy = sortBy;
    this.state.pedals = pedals;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
  }

  async getPedalData() {
    let pedals = [];

    const { searchQuery, sortBy, sortOrder } = this.state;

    if (searchQuery.length > 0) {
      let response = await fetch(`/api/search/${encodeURIComponent(searchQuery)}`);

      if (response.status === 200) {
        let json = await response.json();
        let sortKey = "model";

        if (["model", "type", "manufacturer"].indexOf(sortBy) !== -1) {
          sortKey = sortBy;
        }

        json = simpleSort(json, sortKey, sortOrder);

        for (let entry in json) {
          const pedal = json[entry];
          pedals.push(<Pedal id={pedal.id} manufacturer={pedal.manufacturer} model={pedal.model} type={pedal.type} />);
        }
      }
    }

    this.setState({
      pedals
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getPedalData();
  }

  handleSort(event) {
    this.setState({
      sortBy: event.target.value
    });

    this.getPedalData();
  }

  handleSortOrder(event) {
    this.setState({
      sortOrder: event.target.value
    });

    this.getPedalData();
  }

  handleChange(event) {
    this.setState({
      searchQuery: event.target.value
    });
  }

  render() {
    const { searchQuery, sortBy, sortOrder, pedals } = this.state;

    return (
      <section>
        <form onSubmit={this.handleSubmit} method="POST" action="/">
          <label className="search__label" for="query"><strong>STOMP</strong>LIST</label>
          <fieldset className="search__fields">
            <input className="search__input" type="text" placeholder="Search effect pedals" value={searchQuery} onChange={this.handleChange} id="query" name="query" />
            <input className="search__submit" type="submit" value="Go" />
            <div className="sort">
              <div className="sort__container">
                <label className="sort__label" for="sortOrder">Sort by:</label>
                <div className="sort__select-container">
                  <select className="sort__select" id="sortBy" name="sortBy" onChange={this.handleSort}>
                    <option value="manufacturer" selected={sortBy === "manufacturer"}>Manufacturer</option>
                    <option value="model" selected={sortBy === "model"}>Model</option>
                    <option value="type" selected={sortBy === "type"}>Type</option>
                  </select>
                </div>
              </div>
              <div className="sort__container">
                <label className="sort__label" for="sortOrder">in order:</label>
                <div className="sort__select-container">
                  <select className="sort__select" id="sortOrder" name="sortOrder" onChange={this.handleSortOrder}>
                    <option value="asc" selected={sortOrder === "asc"}>Ascending</option>
                    <option value="desc" selected={sortOrder === "desc"}>Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </fieldset>
        </form>
        <hr className="separator" />
        <PedalList>
          {pedals}
        </PedalList>
        <p style={`display: ${pedals.length > 0 ? "none" : "block"}`}>
          No pedals found. Maybe try a different search term?<span className="favorites-link"> Or perhaps browse <a href="/favorites">your favorite pedals list</a>?</span>
        </p>
      </section>
    );
  }
}
