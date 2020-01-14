import TestableComponents from "./TestableComponents";

const testJson = require("../../../../testData/Test.json");

for (let jsonKey in testJson) {
  let jsonObject = testJson[jsonKey];

  it(`${jsonKey} is created by the ${jsonObject.type} builder`, () => {
    let component = TestableComponents(testJson)[jsonObject.type];
    let constructedItem = component.builder(jsonKey, jsonObject);

    expect(constructedItem).toEqual(component.expectedDOM);
  });
}
