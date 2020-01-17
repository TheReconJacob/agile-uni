import reusableComponents from "./ReusableComponents";
import { cleanup, render } from "@testing-library/react";

const testJson = require("../../../testData/ReusableComponentTest");

afterEach(cleanup);

function renderable(component) {
  switch (component) {
    case "Button":
      return ["Test", render(reusableComponents[component].expectedDom)];

    case "Modal":
      return [
        "lorem ipsum",
        render(reusableComponents[component].expectedDom.props.textToDisplay)
      ];

    case "Select":
      return [
        "Test Label",
        render(reusableComponents[component].expectedDom.props.labelText)
      ];

    case "RichText":
      return [
        "rich-text",
        render(reusableComponents[component].expectedDom.props.label)
      ];

    default:
      console.log(`Couldn't find component: "${component}"`);
  }
}

describe("given the ReusableComponentTest.json file", () => {
  for (let component in testJson) {
    it(`${component} is rendered with props to the page`, () => {
      const rnd = renderable(component);
      const { getByText } = rnd[1];
      getByText(rnd[0]);
    });
  }
});
