import React from "react";
import ButtonComponent from "../../reusable/Button";

function buttonBuilder(key, FormItem) {
  return (
    <ButtonComponent
      type={
        FormItem.submit || FormItem.reset
          ? FormItem.submit
            ? "submit"
            : "reset"
          : "button"
      }
      text={FormItem.text}
      stateModifier={FormItem.disabled ? "disabled" : undefined}
    />
  );
}

export default buttonBuilder;
