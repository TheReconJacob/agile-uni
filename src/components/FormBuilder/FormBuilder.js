import React from "react";
import typeToBuilderMap from "./builderMap";

const styleWrapper = (key, style, content) => (
  <div key={key} style={style}>
    {content}
  </div>
);

function formReader(dataToRead, parentKey = "") {
  let formDOM = [];

  Object.entries(dataToRead).forEach(([formItemKey, formItem]) => {
    const combinedKey = `${parentKey}${formItemKey}`;

    let styleOverride = parentKey
      ? { display: "inline-block", width: formItem.width }
      : {};

    if (formItem.center) {
      styleOverride.textAlign = "center";
    }

    formDOM.push(
      styleWrapper(
        combinedKey,
        styleOverride,
        formItem.type === "container"
          ? formReader(formItem.contents, `${combinedKey}-`)
          : typeToBuilderMap[formItem.type](combinedKey, formItem)
      )
    );
  });

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
