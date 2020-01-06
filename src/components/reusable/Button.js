import React from "react";
import { Button } from "@sky-uk/toolkit-react";
import "../../styles/button.scss";

function ButtonComponent(props) {
  const { key, text, onClick } = props;

  return (
    <Button cssClassName="button" key={key} text={text} onClick={onClick} />
  );
}

export default ButtonComponent;
