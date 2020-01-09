import React from "react";
import Select from "../../reusable/Select";

function selectBuilder(key, FormItem) {
  return (
    <Select
      name={key}
      label={FormItem.label}
      items={FormItem.items}
      required={FormItem.required}
      default={FormItem.default}
    />
  );
}

export default selectBuilder;
