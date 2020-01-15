import React, { useState, useEffect } from "react";
import { SelectInput } from "@sky-uk/toolkit-react";
import axios from "axios";

function Select(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    let formattedOptions = [];

    if (typeof props.items === "string") {
      axios
        .get(props.items)
        .then(response => {
          response.data.forEach(dataObject => {
            formattedOptions.push({
              value: dataObject.id,
              label: dataObject.name
            });
          });
          setOptions(formattedOptions);
        })
        .catch(error => console.log(error));
    } else {
      Object.entries(props.items).forEach(([selectItemKey, selectItem]) => {
        formattedOptions.push({
          value: selectItemKey,
          label: selectItem.label
        });
      });
      setOptions(formattedOptions);
    }
  }, [props.items]);

  return (
    <SelectInput
      id={`${props.name}`}
      labelText={props.label}
      options={options}
      required={props.required}
      defaultOption={props.default}
      onChange={value => setSelectedValue(value)}
      value={selectedValue}
    />
  );
}

export default Select;
