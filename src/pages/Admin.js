import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/admin.scss";
// import { authProvider } from "../authProvider";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../styles/quill.scss";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
      description: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target);
    data.append("description", this.state.description);
    fetch("http://localhost:5000/addCourse", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("msal.idtoken")
      },
      body: data
    }).then((response) => {
      if (response.ok) {
        window.location.replace("http://localhost:3000/courses");
      } else {
        throw new Error('Something went wrong');
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  render() {
  
    return (
      <>
        <div className="c-hero hero-background">
          <div className="hero-title">
            <p className="hero-title-text">Admin</p>
            <SearchBar />
          </div>
        </div>

        <div className="o-container u-padding-bottom-large u-padding-top-large form-container ">
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <legend className="c-form-caption">Add courses</legend>
              <ul className="c-form-list">
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label ">
                    Title
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <input
                    type="text"
                    className="c-form-input"
                    name="title"
                    id="f-title" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label ">
                    Instructor Name
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <input
                    type="text"
                    className="c-form-input"
                    name="instructor"
                    id="f-instructor" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label">
                    Start date
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <input
                    type="date"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-3/4 "
                    name="start_date"
                    id="f-start-date" //onChange={this.handleChange}
                    required
                  />
                  <input
                    type="time"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-1/4"
                    name="start_time"
                    id="f-start-time" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label">
                    End date
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <input
                    type="date"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-3/4"
                    name="end_date"
                    id="f-end-date" //onChange={this.handleChange}
                    required
                  />
                  <input
                    type="time"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-1/4"
                    name="end_time"
                    id="f-end-time" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label">
                    Site
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <div className="c-form-select">
                    <select
                      id="f-site"
                      name="site"
                      className="c-form-select__dropdown" //onChange={this.handleChange}
                      defaultValue={"DEFAULT"}
                      required
                    >
                      <option value="DEFAULT" disabled>
                      </option>
                      <option value="1">Osterley</option>
                      <option value="2">Leeds</option>
                      <option value="3">Livingston</option>
                    </select>
                  </div>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label ">
                    Location
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                  <input
                    type="text"
                    className="c-form-input"
                    name="location"
                    id="f-location" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label">
                    Maximum number of participants
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <input
                    type="number"
                    min="0"
                    className="c-form-date"
                    name="attendees_max"
                    id="attendees-max" //onChange={this.handleChange}
                    required
                  />
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <label className="c-form-label">
                    Description
                    <abbr
                      title="This field is required"
                      className="c-form-required"
                      name="description"
                      id="description"
                    >
                      *
                    </abbr>
                  </label>
                </li>
                <li className="c-form-list__item u-width-1/2">
                  <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onInit={editor => {
                      // You can store the "editor" and use when it is needed.
                      console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      this.setState({ description: editor.getData() });
                    }}
                    onBlur={(event, editor) => {
                      console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      console.log("Focus.", editor);
                    }}
                  />
                </li>
                <button type="submit" className="c-btn c-btn--primary">
                  Add Course
                </button>
              </ul>
            </fieldset>
          </form>
        </div>
      </>
    );
  }
}

export default Admin;
