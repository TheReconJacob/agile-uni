import React, { Component } from "react";
import axios from "axios";
import "../styles/searchBar.scss";

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
      site: "",
      searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    return (
      <div className="o-container">
        <form>
          <fieldset>
            <ul className="c-form-list o-layout--spaced">
              <li className="c-form-list">
                <select
                  id="f-sites"
                  name="site"
                  className="c-form-select__dropdown--inline o-layout__item u-width-1/4"
                  onChange={this.handleChange}
                  style={{ height: 39 }}
                  defaultValue={"DEFAULT"}
                >
                  <option value="DEFAULT" disabled>
                    Location
                  </option>
                  <option value="Osterley">Osterley</option>
                  <option value="Leeds">Leeds</option>
                  <option value="Livingston">Livingston</option>
                </select>
                <div className="c-form-combo--inline o-layout__item u-width-3/4">
                  <div className="c-form-combo__cell">
                    <input
                      type="text"
                      name="searchTerm"
                      className="c-form-combo__input c-form-input"
                      placeholder="Search for your next course"
                      id="f-combo"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="c-form-combo__cell">
                    <button
                      className="c-form-combo__btn c-btn c-btn--primary"
                      onClick={getSearch(this.searchTerm)}
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
