import React, { Component } from "react";
import axios from "axios";
import "../styles/searchBar.scss";
import { Dropdown } from "@sky-uk/toolkit-react";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      searchTerm: "",
      site: "",
      popup: false
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
    event.preventDefault();
    window.location.href = `/courses?searchTerm=${this.state.searchTerm}&site=${this.state.site}`;
  }

  getSites() {
    axios
      .get("http://localhost:5000/sites")
      .then(response => {
        const sitesRaw = response.data;
        let listItems = [];

        sitesRaw.forEach(site =>
          listItems.push({ text: site.name, value: site.id })
        );

        this.setState({ sites: listItems });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  handleLocationChange(item) {
    console.log(item);
  }

  render() {
    return (
      <div className="o-container">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <ul className="c-form-list o-layout--spaced">
              <li className="c-form-list">
                <Dropdown
                  name="Location"
                  onChange={this.handleLocationChange}
                  items={this.state.sites}
                  isOpen={this.state.popup}
                  onClick={() => this.setState({ popup: !this.state.popup })}
                />
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
                    <Link
                      to={{
                        pathname: `/courses`,
                        search: `?searchTerm=${this.state.searchTerm}&site=${this.state.site}`
                      }}
                      className="c-form-combo__btn c-btn c-btn--primary"
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
