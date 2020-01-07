import React from "react";
import { Input } from "@sky-uk/toolkit-react";
import ButtonComponent from "./reusable/Button.js";
const JSONdata = require("./AdminForm.json");

function formReader(dataToRead, child = false, parentKey = "") {
  let finalHTML = [];

  for (let FormItemKey in dataToRead) {
    let FormItem = dataToRead[FormItemKey];

    let styleOverride = child
      ? { display: "inline-block", width: FormItem.width }
      : {};

    if (FormItem.center) {
      styleOverride.textAlign = "center";
    }

    switch (FormItem.type) {
      case "text":
      case "email":
      case "tel":
      case "password":
      case "number":
      case "time":
      case "date":
        console.log(`create ${FormItem.type}`);
        console.log(FormItemKey);
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            <Input
              id={`${FormItemKey}-${parentKey}`}
              type={FormItem.type}
              cssClassName={FormItem.css}
              labelText={FormItem.label}
              maxlength={FormItem.maxLength}
              required={FormItem.required}
              placeholder={FormItem.placeholder}
              min={FormItem.min}
              max={FormItem.max}
            />
          </div>
        );
        console.log("Done");
        break;

      case "button":
        console.log("Create button");

        if (FormItem.submit && FormItem.reset) {
          console.error("Buttons cannot reset and submit");
        }

        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            <ButtonComponent
              type={
                FormItem.submit || FormItem.reset
                  ? FormItem.submit
                    ? "submit"
                    : "reset"
                  : "button"
              }
              text={FormItem.text}
            />
          </div>
        );
        break;

      case "container":
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            {formReader(FormItem.contents, true, FormItemKey)}
          </div>
        );
        break;

      default:
        console.error("JSON interpreted incorrectly");
        break;
    }
  }

  return finalHTML;
}

function FormBuilder(props) {
  console.log(JSONdata);

  return (
    <>
      <form {...props}>{formReader(JSONdata)}</form>
    </>
  );
}

export default FormBuilder;
