import React, { Component } from "react";
import "../styles/searchBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class SearchBar extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     site: "",
  //     searchTerm: ""
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange(evt) {
  //   // check it out: we get the evt.target.name (which will be either "email" or "password")
  //   // and use it to target the key on our `state` object with the same name, using bracket syntax
  //   this.setState({ [evt.target.name]: evt.target.value });
  // }

  // onChange(event) {
  //   console.log(event.target.name); // the name of the form element
  //   console.log(event.target.value); // the value of the form element
  // }

  render() {
    return (
      <form>
        <fieldset>
          <ul class="c-form-list o-layout--spaced">
            <li class="c-form-list">
              <select
                id="f-sites"
                name="site"
                class="c-form-select__dropdown--inline o-layout__item u-width-1/4"
                onChange={this.handleChange}
                style={{ height: 39 }}
              >
                <option value="" disabled selected>
                  Location
                </option>
                <option value="Osterley">Osterley</option>
                <option value="Leeds">Leeds</option>
                <option value="Livingston">Livingston</option>
              </select>
              {/* </li>
            <li class="c-form-list__item o-layout__item u-width-1/2"> */}
              <div class="c-form-combo--inline o-layout__item u-width-3/4">
                <div class="c-form-combo__cell">
                  <input
                    type="text"
                    name="searchTerm"
                    class="c-form-combo__input c-form-input"
                    placeholder="Search for your next course"
                    name="f-combo"
                    id="f-combo"
                    onChange={this.handleChange}
                  />
                </div>
                <div class="c-form-combo__cell">
                  <button class="c-form-combo__btn c-btn c-btn--primary">
                    Search
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </fieldset>
      </form>
    );
  }
}
export default SearchBar;
