import React from "react";
import typeToBuilderMap from "./builderMap";

const styleWrapper = (key, style, content) => (
  <div key={key} style={style}>
    {" "}
    {content}{" "}
  </div>
);

function formReader(dataToRead, parentKey = "") {
  let formDOM = [];

  for (let FormItemKey in dataToRead) {
    let FormItem = dataToRead[FormItemKey];
    let combinedKey = `${parentKey}${FormItemKey}`;

    let styleOverride = parentKey
      ? { display: "inline-block", width: FormItem.width }
      : {};

    if (FormItem.center) {
      styleOverride.textAlign = "center";
    }

    formDOM.push(
      styleWrapper(
        combinedKey,
        styleOverride,
        FormItem.type === "container"
          ? formReader(FormItem.contents, `${parentKey}${FormItemKey}-`)
          : typeToBuilderMap[FormItem.type](combinedKey, FormItem)
      )
    );
  }

  return formDOM;
}

function FormBuilder(props) {
  return (
    <>
      <form {...props}>{formReader(props.json, "")}</form>
    </>
  );
}

export default FormBuilder;
