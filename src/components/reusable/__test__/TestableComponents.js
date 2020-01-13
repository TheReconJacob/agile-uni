import React from "react";

import ButtonComponent from "../Button";

const testableComponents = () => ({
  button: {
    expectedDom: <ButtonComponent text="Test" type="submit" />
  }
});

export default testableComponents;
