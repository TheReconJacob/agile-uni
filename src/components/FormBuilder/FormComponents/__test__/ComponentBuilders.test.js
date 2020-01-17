import TestableComponents from "./TestableComponents";

const testJson = require("../../../../testData/Test.json");

Object.entries(testJson).forEach(([JSONObjectKey, JSONObject]) => {
  it(`${JSONObjectKey} is created by the ${JSONObject.type} builder`, () => {
    const component = TestableComponents(testJson)[JSONObject.type];
    const constructedItem = component.builder(JSONObjectKey, JSONObject);

    expect(constructedItem).toEqual(component.expectedDOM);
  });
});
