import React, { Component } from "react";
import { ComboInput } from "@sky-uk/toolkit-react";
import DropdownLocation from "./Dropdown";
import "../styles/searchBar.scss"

class SearchBar extends Component {
  render() {
    return (
      <form>
        <fieldset>
          <legend class="c-form-caption">Example</legend>
          <ul class="c-form-list">
            <li class="c-form-list__item">
              <div class="c-form-select">
                <select id="f-heroes" class="c-form-select__dropdown">
                  <option value="" disabled selected>Location</option>
                  <option value="captainAmerica">Osterley</option>
                  <option value="ironMan">Leeds</option>
                  <option value="blackWidow">Livingston</option>
                </select>
              </div>
            </li>
            <li class="c-form-list__item">
              <div class="c-form-combo">
                <div class="c-form-combo__cell">
                  <input type="text" class="c-form-combo__input c-form-input" placeholder="Search for your next course" name="f-combo" id="f-combo" />
                </div>
                <div class="c-form-combo__cell">
                  <button class="c-form-combo__btn c-btn c-btn--primary">Search</button>
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