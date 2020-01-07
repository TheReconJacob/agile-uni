import React from "react";
import FormBuilder from "../components/FormBuilder";

function Sandbox() {
  return (
    <>
      <FormBuilder action="http://localhost:5000/test" method="post" />
    </>
  );
}

export default Sandbox;
