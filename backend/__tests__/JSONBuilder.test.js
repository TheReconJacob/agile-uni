const JSONBuilder = require("../data/JSONBuilder.js");
const {
  originalForm,
  untouchedForm,
  defaultValues,
  expectedDefaults
} = require("./expectedJSONs.json");

function checkForDefaults(json, expectedDefaults, containerName = "") {
  let containsCorrectDefaults = "";

  Object.keys(json).forEach(key => {
    const combinedKey = containerName + key;

    if (
      json[key].hasOwnProperty("default") ===
      expectedDefaults[key].shouldHaveDefault
    ) {
      if (
        json[key].hasOwnProperty("default") &&
        json[key].default !== expectedDefaults[key].expectedDefault
      ) {
        containsCorrectDefaults += `${combinedKey} contains the wrong default value "${json[key].default}", `;
      }
    } else {
      if (expectedDefaults[key].shouldHaveDefault) {
        containsCorrectDefaults += `${combinedKey} should contain a default value, `;
      } else {
        containsCorrectDefaults += `${combinedKey} shouldn't contain a default value, `;
      }
    }
  });

  if (!containsCorrectDefaults) return true;
  else return containsCorrectDefaults;
}

describe("When using the JSONBuilder it", () => {
  const builtFormWithDefaults = JSONBuilder(originalForm, defaultValues);

  it("Should only add defaults to the correct field types", () => {
    const defaultCheck = checkForDefaults(
      builtFormWithDefaults,
      expectedDefaults
    );

    expect(defaultCheck).toBe(true);
  });

  it("Should be able to add defaults to fields inside containers", () => {
    const defaultCheck = checkForDefaults(
      builtFormWithDefaults.container.contents,
      expectedDefaults.container.contents,
      "container_"
    );

    expect(defaultCheck).toBe(true);
  });

  it("Shouldn't alter the original form", () => {
    expect(untouchedForm).toMatchObject(originalForm);
  });

  it("Should make required equal to false", () => {
    expect(builtFormWithDefaults.inputField.required).toBe(false);
    expect(builtFormWithDefaults.container.contents.inputField.required).toBe(
      false
    );
  });
});
