import React, { Component } from "react";
import "../styles/dropdown.scss";

class DropdownSite extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {}

  handleChange(evt) {
    this.props.setSite(parseInt(evt.target.value, 10));
  }

  render() {
    let options = this.props.state.options;
    let optionItems = options.map(options => (
      <option key={options.id} value={options.id}>
        {options.name}
      </option>
    ));
    return (
      <select
        className="c-form-select__dropdown--inline o-layout__item u-width-1/4"
        style={{ height: 39 }}
        onChange={this.handleChange}
      >
        <option value="">Select a location</option>
        {optionItems}
      </select>
    );
  }
}

export default DropdownSite;
