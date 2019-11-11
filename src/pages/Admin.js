import React from "react";
import SearchBar from "../components/SearchBar";
import DatePicker from "react-datepicker";
import "../styles/admin.scss";
import Quill from "../components/Quill";

class Admin extends React.Component {
    constructor() {
        super();
        this.state = {
          title: "",
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
          numberParticipants: "",
          description: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }
      handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }

      handleSubmit(event) {
          
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
      
           <div class="o-container u-padding-bottom-large u-padding-top-large form-container o-layout--center">
           
      <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend class="c-form-caption">Add courses</legend>
            <ul class="c-form-list">
                <li class="c-form-list__item u-width-1/2">
                    <input type="text" class="c-form-input" placeholder="Title..." name="f-title" id="f-title" onChange={this.handleChange} required />
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="date" class="c-form-date c-form-combo--inline o-layout__item u-width-3/4 " placeholder="Choose a start date..." name="f-start-date" id="f-start-date" onChange={this.handleChange} required />
                    <input type="time" class="c-form-date c-form-combo--inline o-layout__item u-width-1/4" placeholder="Choose a start time..." name="f-start-time" id="f-start-time" onChange={this.handleChange} required />
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="date" class="c-form-date c-form-combo--inline o-layout__item u-width-3/4" placeholder="Choose an end time and date..." name="f-end-date" id="f-end-date" onChange={this.handleChange} required />
                    <input type="time" class="c-form-date c-form-combo--inline o-layout__item u-width-1/4" placeholder="Choose an end time..." name="f-end-time" id="f-end-time" onChange={this.handleChange} required />
                </li>
                <li class="c-form-list__item u-width-1/2">
                <div class="c-form-select">
                    <select id="f-heroes" class="c-form-select__dropdown" onChange={this.handleChange} required>
                    <option value="" disabled selected>Choose a location...</option>
                    <option value="Osterley">Osterley</option>
                    <option value="Leeds">Leeds</option>
                    <option value="Livingston">Livingston</option>
                    </select>
                </div>
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <input type="number" min="0" class="c-form-date" placeholder="Choose number of participants..." name="f-number-of-participants" id="f-number-of-participants" onChange={this.handleChange} required/>
                  
                </li>
                <li class="c-form-list__item u-width-1/2">
                    <Quill />
                </li>
          <button type="submit" className="c-btn c-btn--primary">Add Course</button>
          </ul>
          </fieldset>
      </form>
      
      </div>
      
         </>   
        );
    }

}

export default Admin;