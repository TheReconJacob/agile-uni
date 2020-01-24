import React from "react";
import "./../../../styles/header.scss";

function headerBuilder(key, FormItem) {
  return <h1 className="header">{FormItem.text}</h1>;
}

export default headerBuilder;
