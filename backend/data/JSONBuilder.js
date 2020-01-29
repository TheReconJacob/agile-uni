module.exports = (form, defaultValuesObject) => {
  function addDefaultsToJson(jsonToEdit, containerName = "") {
    const builtJson = {};

    Object.keys(jsonToEdit).forEach(key => {
      const combinedKey = containerName + key;
      if (jsonToEdit[key].type === "container")
        builtJson[key] = {
          ...jsonToEdit[key],
          contents: addDefaultsToJson(jsonToEdit[key].contents, `${key}_`)
        };
      else if (
        jsonToEdit[key].type !== "button" &&
        jsonToEdit[key].type !== "header" &&
        defaultValuesObject[combinedKey]
      )
        builtJson[key] = {
          ...jsonToEdit[key],
          default: defaultValuesObject[combinedKey],
          required: false
        };
      else builtJson[key] = { ...jsonToEdit[key], required: false };
    });

    return builtJson;
  }

  return addDefaultsToJson(form);
};
