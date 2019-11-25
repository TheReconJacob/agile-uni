import React from "react";
import SearchBar from "../components/SearchBar";
import "../styles/admin.scss";
import axios from "axios";
// import { authProvider } from "../authProvider";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "../styles/quill.scss";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getTime } from "date-fns";


axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");


class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      numberParticipants: "",
      description: "",
    };

    if (this.props.location.state != undefined) {
      console.log(this.props.location.state.course_id);
      this.getCourse()
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.reload = this.reload.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target);
    data.append("description", this.state.description);
    data.append("course_id", this.props.location.state.course_id);
    fetch("http://localhost:5000/editCourse", {
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

  getCourse() {
    const params = this.props.location.state.course_id;
    
    axios
      .get(`http://localhost:5000/findCourseById?course_id=${params}`)
      .then((response) => {console.log(response.data.courses.responseJson[0])
        return response.data.courses.responseJson[0]})
      .then((res) => {
        this.setState({ 
          title: res.title,
          start_date: res.start_date.slice(0, 10),
          start_time: res.start_date.slice(11, 16),
          end_date: res.end_date.slice(0, 10),
          end_time: res.end_date.slice(11, 16),
          attendees_max: res.attendees_max,
          description: res.description,
          instructor_name: res.instructor_name,
          site_id: res.site_id,
          location: res.location
         });
      })//.then(() => {this.reaload()})
      .catch(function (error) {
        console.log(error);
      });
  }

  reload() {
    this.forceUpdate();
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
                    id="f-title"
                    required
                    // onChange={e => this.setState({title: e.target.value})}
                    defaultValue={this.state.title} //onChange={(e) => (this.setState({title: e.target.value}))}
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
                    name="instructor_name"
                    id="f-instructor" 
                    defaultValue={this.state.instructor_name}
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
                    id="f-start-date" 
                    defaultValue={this.state.start_date}
                    required
                  />
                  <input
                    type="time"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-1/4"
                    name="start_time"
                    id="f-start-time" 
                    defaultValue={this.state.start_time}
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
                    id="f-end-date" 
                    defaultValue={this.state.end_date}
                    required
                  />
                  <input
                    type="time"
                    className="c-form-date c-form-combo--inline o-layout__item u-width-1/4"
                    name="end_time"
                    id="f-end-time" 
                    defaultValue={this.state.end_time}
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
                      name="site_id"
                      className="c-form-select__dropdown" 
                      defaultValue={this.state.site_id}
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
                    id="f-location" 
                    defaultValue={this.state.location}
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
                    id="attendees-max" 
                    defaultValue={this.state.attendees_max}
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
                <li className="c-form-list__item u-width-1/2" id="editor">
                 
                  <CKEditor
                    editor={ClassicEditor}
                    data={this.state.description}
                    config={
                      {
                        heading: {
                          options: [
                            { model: 'paragraph', view: { name: 'h1', classes: 'c-text-body' }, title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: { name: 'h1', classes: 'c-heading-charlie' }, title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: { name: 'h2', classes: 'c-heading-delta' }, title: 'Heading 2', class: 'ck-heading_heading2' },
                          ]
                        }
                      }
                    }
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
                      // editor.setData(this.state.description);
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
