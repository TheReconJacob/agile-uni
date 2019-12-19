import React from "react";
import { Button } from "@sky-uk/toolkit-react";
import "../../styles/button.scss";

const ButtonComponent = props => {
  return (
    <Button
      cssClassName="button"
      key={props.key}
      text={props.text}
      onClick={props.onClick}
    />
  );
};

export default ButtonComponent;
