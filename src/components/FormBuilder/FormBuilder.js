import React from "react";
import typeToBuilderMap from "./builderMap";
import axios from "axios";

const styleWrapper = (key, style, content) => (
  <div key={key} style={style}>
    {content}
  </div>
);

const submitRequest = (formData, method, action) => {
  const methodToFunction = { post: axios.post, get: axios.get };

  methodToFunction[method.toLowerCase()](action, formData)
    .then(response => {})
    .catch(error => {
      console.error(error);
    });
};

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
          ? formReader(formItem.contents, `${combinedKey}_`)
          : typeToBuilderMap[formItem.type](combinedKey, formItem)
      )
    );
  });

  return formDOM;
}

function FormBuilder(props) {
  const { onSubmit, method, action, style, json } = props;

  const formSubmitHandler = event => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(event);
    } else {
      const formData = new FormData(event.target);
      submitRequest(formData, method, action);
    }
  };

  return (
    <>
      <form style={style} onSubmit={formSubmitHandler}>
        {formReader(json, "")}
      </form>
    </>
  );
}

export default FormBuilder;
