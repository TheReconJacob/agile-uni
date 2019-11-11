import React from "react";
import SearchBar from "../components/SearchBar";

class Admin extends React.Component {
    constructor() {
        super();
    }
    render() {
        return(
            <>
            <div className="c-hero hero-background">
        <div className="hero-title">
          <p className="hero-title-text">Admin</p>
          <SearchBar />
        </div>
      </div>
      <form>
          <fieldset>
            <legend class="c-form-caption">Add courses</legend>
            <ul class="c-form-list">
                <li class="c-form-list__item">
                    <input type="text" class="c-form-input" placeholder="Title..." name="f-title" id="f-title" required />
                </li>
                <li class="c-form-list__item">
                    <input type="date" class="c-form-date" placeholder="Choose a start time and date..." name="f-start-date" id="f-start-date" />
                </li>
                <li class="c-form-list__item">
                    <input type="date" class="c-form-date" placeholder="Choose an end time and date..." name="f-end-date" id="f-end-date" />
                </li>
                <li class="c-form-list__item">
                <div class="c-form-select">
                    <select id="f-heroes" class="c-form-select__dropdown">
                    <option value="" disabled selected>Choose a location...</option>
                    <option value="captainAmerica">Osterley</option>
                    <option value="ironMan">Leeds</option>
                    <option value="blackWidow">Livingston</option>
                    </select>
                </div>
                </li>
                <li class="c-form-list__item">
                <div class="c-form-select">
                    <select id="f-heroes" class="c-form-select__dropdown">
                    <option value="" disabled selected>Choose number of participants...</option>
                    <option value="captainAmerica">100</option>
                    </select>
                </div>
                </li>
                <li class="c-form-list__item">
                    <textarea class="c-form-input c-form-input--long" placeholder="Description..." name="f-description" id="f-description"></textarea>
                </li>
          <button type="submit" className="c-btn c-btn--primary">Add Course</button>
          </ul>
          </fieldset>
      </form>
            </>
        );
    }

}

export default Admin;