import React from "react";
import "../styles/dropdown.scss";

function DropdownSite(props) {
  let options = props.state.options;
  console.log(props);
  console.log(options);
  let optionItems = options.map(options => (
    <option key={options.id} value={options.id}>
      {options.name}
    </option>
  ));
  return (
    <select
      className="c-form-select__dropdown--inline o-layout__item u-width-1/4"
      style={{ height: 39 }}
      onChange={event => props.setSite(parseInt(event.target.value, 10))}
    >
      <option value="">Select a location</option>
      {optionItems}
    </select>
  );
}

export default DropdownSite;
