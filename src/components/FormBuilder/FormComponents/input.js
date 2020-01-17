import React from "react";
import { Input } from "@sky-uk/toolkit-react";

function inputBuilder(key, FormItem) {
  return (
    <Input
      id={key}
      type={FormItem.type}
      cssClassName={FormItem.css}
      labelText={FormItem.label}
      maxlength={FormItem.maxLength}
      required={FormItem.required}
      placeholder={FormItem.placeholder}
      min={FormItem.min}
      max={FormItem.max}
    />
  );
}

export default inputBuilder;
