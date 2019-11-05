import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "./DropdownStyle.css";

const options = ["Osterley", "Leeds", "Scotland"];

const arrowClosed = <span className="arrow-closed" />;
const arrowOpen = <span className="arrow-open" />;

class DropdownLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect(option) {
    console.log("You selected ", option.label);
    this.setState({ selected: option });
  }

  render() {
    const defaultOption = this.state.selected;
    const placeHolderValue =
      typeof this.state.selected === "string"
        ? this.state.selected
        : this.state.selected.label;

    return (
      <Dropdown
        options={options}
        onChange={this._onSelect}
        value={defaultOption}
        placeholder="Location"
        arrowClosed={arrowClosed}
        arrowOpen={arrowOpen}
      />
    );
  }
}

export default DropdownLocation;
