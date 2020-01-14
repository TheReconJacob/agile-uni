import React from "react";
import { cleanup, render } from "@testing-library/react";

import FormBuilder from "../";
const JSONdata = require("../../../testData/Test.json");

let renderedObject;

// emulate mutation observer, lest ck editor complains
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

beforeEach(() => {
  renderedObject = render(
    <FormBuilder
      json={JSONdata}
      action="http://localhost:5000/test"
      method="post"
    />
  );
});

afterEach(cleanup);

describe("FormBuilder renders correctly", () => {
  for (let JSONKey in JSONdata) {
    let JSONObject = JSONdata[JSONKey];
    test(`${JSONKey} is rendered correctly`, () => {
      switch (JSONObject.type) {
        case "button":
          renderedObject.getByText(new RegExp(JSONObject.text));
          break;

        default:
          renderedObject.getByLabelText(new RegExp(JSONObject.label));
          break;
      }
    });
  }
});
