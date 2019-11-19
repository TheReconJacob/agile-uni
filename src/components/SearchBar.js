import React, { Component } from "react";
import axios from "axios";
import "../styles/searchBar.scss";
import DropdownLocation from "./Dropdown"

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

function getSearch(searchObj) {
  axios
    .get("http://localhost:5000/search", {
      params: {
        searchTerm: searchObj
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      options: ["Osterley", "Leeds", "Livingstone", "Aylesbury"],
      site: "",
      searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    getSearch(this.state.searchTerm);
    
  }

  render() {
    return (
      <div className="o-container">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <ul className="c-form-list o-layout--spaced">
              <li className="c-form-list">
                <DropdownLocation state={this.state} />
                <div className="c-form-combo--inline o-layout__item u-width-3/4">
                  <div className="c-form-combo__cell">
                    <input
                      type="text"
                      name="searchTerm"
                      className="c-form-combo__input c-form-input"
                      placeholder="Search for your next course"
                      id="f-combo"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="c-form-combo__cell">
                    <button
                      className="c-form-combo__btn c-btn c-btn--primary"
                      type="submit"
                      value="Submit"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </fieldset>
        </form>
      </div>
    );
  }
}
export default SearchBar;
