import React from "react";
import { Button } from "@sky-uk/toolkit-react";
import "../../styles/button.scss";

function ButtonComponent(props) {
  return <Button cssClassName="button" {...props} />;
}

export default ButtonComponent;
