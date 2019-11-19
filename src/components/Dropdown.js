import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "../styles/dropdown.scss";

const arrowClosed = <span className="arrow-closed" />;
const arrowOpen = <span className="arrow-open" />;

class DropdownLocation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let options = this.props.state.options;
    let optionItems = options.map((options) =>
            <option key={options.name}>{options.name}</option>
        );
    return (
          <select className="c-form-select__dropdown--inline o-layout__item u-width-1/4" style={{ height: 39 }}>
            {optionItems}
          </select>
    );
  }
}

export default DropdownLocation;
