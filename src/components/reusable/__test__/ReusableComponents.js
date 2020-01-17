import React from "react";

import ButtonComponent from "../Button";
import ModalComponent from "../Modal";
import SelectComponent from "../Select";
import RichTextComponent from "../RichText";

const testableComponents = {
  Button: {
    expectedDom: <ButtonComponent text="Test" type="submit" />
  },
  Modal: {
    expectedDom: (
      <ModalComponent
        isOpen=""
        onClose=""
        textToDisplay={"lorem ipsum"}
        modalButtons={[["button", ""]]}
      />
    )
  },
  Select: {
    expectedDom: <SelectComponent labelText={"Test Label"} />
  },
  RichText: {
    expectedDom: <RichTextComponent label="rich-text" />
  }
};

export default testableComponents;
