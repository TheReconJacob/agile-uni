import React from "react";
import { Input } from "@sky-uk/toolkit-react";
import ButtonComponent from "./reusable/Button.js";
const JSONdata = require("./AdminForm.json");

function formReader(dataToRead, child = false) {
  let finalHTML = [];

  for (let FormItemKey in dataToRead) {
    let FormItem = dataToRead[FormItemKey];

    if (child) {
      if (!FormItem.width) {
        console.error(`Missing width for ${FormItemKey}`);
      }
    }

    let styleOverride = child
      ? { display: "inline-block", width: FormItem.width }
      : null;

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
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            <ButtonComponent type={FormItem.submit?"submit":"button"} text={FormItem.text} />
          </div>
        );
        break;

      case "container":
        finalHTML.push(
          <div key={FormItemKey} style={styleOverride}>
            {formReader(FormItem.contents, true)}
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
      <form action="/TESTY" method="POST">
        {formReader(JSONdata)}
      </form>
    </>
  );
}

export default FormBuilder;
