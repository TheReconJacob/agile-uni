import React from "react";
import RichText from "../../reusable/RichText";

function richTextBuilder(key, FormItem) {
  return (
    <RichText name={key} required={FormItem.required} label={FormItem.label} />
  );
}

export default richTextBuilder;
