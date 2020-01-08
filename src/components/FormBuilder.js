import React from "react";
import { Input, SelectInput } from "@sky-uk/toolkit-react";
import ButtonComponent from "./reusable/Button.js";
import RichText from "./RichText.js";

function formReader(dataToRead, parentKey = "") {
  let finalHTML = [];

  for (let FormItemKey in dataToRead) {
    let FormItem = dataToRead[FormItemKey];

    let styleOverride = parentKey
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
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            <Input
              id={`${parentKey}${FormItemKey}`}
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
        // console.log("Done");
        break;

      case "select":
        break;
      case "rich_text":
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
          <RichText
            name={FormItemKey}
            required={FormItem.required}
            label={FormItem.label}
          />
          </div>
        );
        break;
      case "button":
        // console.log("Create button");

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
            {formReader(FormItem.contents, `${parentKey}${FormItemKey}-`)}
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
  return (
    <>
      <form {...props}>{formReader(props.json)}</form>
    </>
  );
}

export default FormBuilder;
