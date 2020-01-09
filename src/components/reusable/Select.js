import React, { useState } from "react";
import { SelectInput } from "@sky-uk/toolkit-react";
import axios from "axios";

function Select(props) {
  const [selectedValue, setSelectedValue] = useState("");

  let formattedOptions = [];
  if (typeof props.items === "string") {
    // TODO: Implement in Jacks Rearend
    // console.log("FETCHING SERVER DATA");
    // axios
    //   .get("http://localhost:5000/sites")
    //   .then(response =>{
    //     console.log("greatSUCCESSS");
    //     console.log(`JSON: ${response.data.sites.responseJson}`)
    //     for( let selectItem in response.data.sites.responseJson ){
    //       console.log(selectItem.name);
    //     }
    //   }).catch(error => console.log(error));
  } else {
    for (let selectItemKey in props.items) {
      let selectItem = props.items[selectItemKey];
      formattedOptions.push({
        value: selectItemKey,
        label: selectItem.label
      });
    }
  }
  return (
    <SelectInput
      id={`${props.name}`}
      labelText={props.label}
      options={formattedOptions}
      required={props.required}
      defaultOption={props.default}
      onChange={value => setSelectedValue(value)}
      value={selectedValue}
    />
  );
}

export default Select;
