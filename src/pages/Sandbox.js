import React from "react";
import FormBuilder from "../components/FormBuilder";
const JSONdata = require("../forms/AdminForm.json");

function Sandbox() {
  return (
    <>
      <FormBuilder json={JSONdata} action="http://localhost:5000/test" method="post" />
    </>
  );
}

export default Sandbox;
