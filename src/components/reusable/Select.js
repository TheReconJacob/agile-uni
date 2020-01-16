import React, { useState, useEffect } from "react";
import { SelectInput } from "@sky-uk/toolkit-react";
import axios from "axios";

function networkRequest(url) {
  return new Promise(resolve => {
    let itemArray = [];
    axios
      .get(url)
      .then(response => {
        response.data.forEach(dataObject => {
          itemArray.push({
            value: dataObject.id,
            label: dataObject.name
          });
        });

        resolve(itemArray);
      })
      .catch(error => console.error(error));
  });
}

async function optionFormatter(itemKey, item) {
  let optionsArray = [];
  switch (typeof item) {
    // fetch url
    case "string":
      await networkRequest(item).then(array => {
        optionsArray.push(...array);
      });
      break;
      
    // push hard code object
    case "object":
      optionsArray.push({
        value: itemKey,
        label: item.label
      });
      break;

    default:
      console.error("Unexpected item");
      break;
  }
  return optionsArray;
}

async function itemHandler(items) {
  let formattedArray = [];

  if (typeof items === "string") {
    formattedArray = await optionFormatter(null, items);
  } else {
    for (let itemKey in items) {
      const item = items[itemKey];
      let newArr = await optionFormatter(itemKey, item);
      formattedArray.push(...newArr);
    }
  }

  return formattedArray;
}

function Select(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    itemHandler(props.items).then(itemArray => {
      setOptions(itemArray);
    });
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
