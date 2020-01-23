import React from "react";

function headerBuilder(key, FormItem) {
  return (
    <h1 style={{ fontSize: "48px", textAlign: "center", margin: "1%" }}>
      {FormItem.text}
    </h1>
  );
}

export default headerBuilder;
