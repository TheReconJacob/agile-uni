import React, { Component } from "react";
import "../styles/dropdown.scss";

class DropdownSite extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.state.site)
  }

  handleChange(evt) {
    this.props.setSite(evt.target.value);
  }

  render() {
    let options = this.props.state.options;
    let optionItems = options.map((options) =>
            <option key={options.id} value={options.id}>{options.name}</option>
        );
    return (
          <select className="c-form-select__dropdown--inline o-layout__item u-width-1/4" 
          style={{ height: 39 }}
          onChange={this.handleChange}
          >
            {optionItems}
          </select>
    );
  }
}

export default DropdownSite;
