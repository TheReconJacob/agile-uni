import React from "react";
import FormBuilder from "../components/FormBuilder";
import RichText from "../components/RichText";
const JSONdata = require("../forms/AdminForm.json");

function Sandbox() {
  return (
    <>
      <FormBuilder
        json={JSONdata}
        action="http://localhost:5000/test"
        method="post"
      />
    </>
  );
}

export default Sandbox;
