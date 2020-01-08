import React from "react";
import "../styles/dropdown.scss";

function DropdownSite(props) {
  const { handleOption, optionsObjects } = props;

  let optionItems = optionsObjects.map(options => (
    <option key={options.id} value={options.id}>
      {options.name}
    </option>
  ));

  return (
    <select
      className="c-form-select__dropdown--inline o-layout__item u-width-1/4"
      style={{ height: 39 }}
      onChange={handleOption}
    >
      <option value="">Select a location</option>
      {optionItems}
    </select>
  );
}

export default DropdownSite;
