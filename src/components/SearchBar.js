import React, { Component } from "react";
import axios from "axios";
import "../styles/searchBar.scss";
import DropdownSite from "./Dropdown"
import { Link } from 'react-router-dom'

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      searchTerm: "",
      site: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.getSites();
  }
  
  handleChange(evt) {
    this.setState({ searchTerm: evt.target.value });
  }

  handleSubmit(event) {
    event.preventDefault()
    window.location.href = `/courses?searchTerm=${this.state.searchTerm}&site=${this.state.site}`
  }

  getSites() {
    axios
      .get("http://localhost:5000/sites")
      .then((response) => this.setState({ options: response.data.sites.responseJson }))
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="o-container">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <ul className="c-form-list o-layout--spaced">
              <li className="c-form-list">
                <DropdownSite state={this.state} setSite={(id) => this.setState({ site: id })}/>
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
                    <Link to={{
                    pathname: `/courses`,
                    search: `?searchTerm=${this.state.searchTerm}&site=${this.state.site}`
                    }} className="c-form-combo__btn c-btn c-btn--primary"
                    >
                    Search
                    </Link>
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
