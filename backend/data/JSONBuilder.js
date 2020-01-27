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
        jsonToEdit[key].type !== "header"
      )
        builtJson[key] = {
          ...jsonToEdit[key],
          default: defaultValuesObject[combinedKey]
        };
      else builtJson[key] = { ...jsonToEdit[key] };
    });

    return builtJson;
  }

  return addDefaultsToJson(form);
};
