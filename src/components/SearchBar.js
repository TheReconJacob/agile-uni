import React from "react";
import { useHistory } from "react-router-dom";
import "../styles/searchBar.scss";
import FormBuilder from "./FormBuilder/FormBuilder";
const FormJSON = require("../forms/SearchBarForm.json");

function SearchBar() {
  const history = useHistory();

  const handleSubmit = event => {
    const formObject = new FormData(event.target);
    const siteId = formObject.get("search_siteId");
    const searchTerm = formObject.get("search_courseTitleFragment");

    event.preventDefault();
    history.location.pathname = "/courses";
    history.push(`?searchTerm=${searchTerm}&siteId=${siteId}`);
  };

  return (
    <div className="o-container">
      <FormBuilder json={FormJSON} onSubmit={handleSubmit} />
    </div>
  );
}
export default SearchBar;
