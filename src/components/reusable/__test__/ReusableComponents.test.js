import { testableComponents } from "./ExpectedComponents";
import { cleanup, render } from "@testing-library/react";

const testJson = require("../../../testData/ReusableComponentTest");

afterEach(cleanup);

function renderable(component) {
  switch (component) {
    case "Button":
      return ["Test", render(testableComponents[component].expectedDom)];

    case "Modal":
      return [
        "lorem ipsum",
        render(testableComponents[component].expectedDom.props.textToDisplay)
      ];

    case "Select":
      return [
        "Test Label",
        render(testableComponents[component].expectedDom.props.labelText)
      ];

    case "RichText":
      return [
        "rich-text",
        render(testableComponents[component].expectedDom.props.label)
      ];

    default:
      console.log(`Couldn't find component: "${component}"`);
  }
}

describe("given the ReusableComponentTest.json file", () => {
  for (let component in testJson) {
    it(`${component} is rendered with props to the page`, () => {
      const renderedComponent = renderable(component);
      const [expectedText, { getByText }] = renderedComponent;

      getByText(expectedText);
    });
  }
});
