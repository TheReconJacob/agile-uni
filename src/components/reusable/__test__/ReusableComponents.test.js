import TestableComponents from "./TestableComponents";

const testJson = require("../../../testData/ReusableComponentTest");
import React from "react";
import { render } from "@testing-library/react";
import ButtonComponent from "../Button";
import ModalComponent from "../Modal";

const expectedText = {
  Button: "Test",
  Modal: "lorem ipsum"
};

for (let component in testJson) {
  it(`${component} is rendered with props to the page`, () => {
    const { getByText } = render(
      <ButtonComponent text={testJson[component].text} />
    );

    getByText(expectedText[component]);
  });
}

// for (let component in testJson) {
//   it(`${component} is rendered with props to the page`, () => {
//     let componentToRender = TestableComponents(component);

//     let matching = testJson.button.text;

//     expect(componentToRender).toEqual(matching);
//   });
// }
