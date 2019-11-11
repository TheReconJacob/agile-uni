import React from "react";
import SearchBar from "../components/SearchBar";
import DatePicker from "react-datepicker";
import "../styles/admin.scss";

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
           <div class="o-container o-container--ee u-padding-bottom-large u-padding-top-large form-container">
           <div className="o-layout__item">
      <form>
          <fieldset>
            <legend class="c-form-caption">Add courses</legend>
            <ul class="c-form-list">
                <li class="c-form-list__item u-width-1/2">
                    <input type="text" class="c-form-input" placeholder="Title..." name="f-title" id="f-title" required />
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="date" class="c-form-date c-form-combo--inline o-layout__item u-width-3/4 " placeholder="Choose a start date..." name="f-start-date" id="f-start-date" />
                    <input type="time" class="c-form-time c-form-combo--inline o-layout__item u-width-1/4" placeholder="Choose a start time..." name="f-start-time" id="f-start-time" />
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="date" class="c-form-date c-form-combo--inline o-layout__item u-width-3/4" placeholder="Choose an end time and date..." name="f-end-date" id="f-end-date" />
                    <input type="time" class="c-form-time c-form-combo--inline o-layout__item u-width-1/4" placeholder="Choose an end time..." name="f-end-time" id="f-end-time" />
                </li>
                <li class="c-form-list__item u-width-1/2">
                <div class="c-form-select">
                    <select id="f-heroes" class="c-form-select__dropdown">
                    <option value="" disabled selected>Choose a location...</option>
                    <option value="captainAmerica">Osterley</option>
                    <option value="ironMan">Leeds</option>
                    <option value="blackWidow">Livingston</option>
                    </select>
                </div>
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="number" min="0" class="c-form-date" placeholder="Choose number of participants..." name="f-number-of-participants" id="f-number-of-participants" />
                  
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <textarea class="c-form-input c-form-input--long" placeholder="Description..." name="f-description" id="f-description"></textarea>
                </li>
          <button type="submit" className="c-btn c-btn--primary">Add Course</button>
          </ul>
          </fieldset>
      </form>
      </div>
      </div>
      
         </>   
        );
    }

}

export default Admin;