import React from "react";
import "../styles/admin.scss";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function SaveButton() {
  return (
    <button type="submit" className="c-btn c-btn--primary" id="saveButton">
      Save
    </button>
  );
}

function AddButton() {
  return (
    <button type="submit" className="c-btn c-btn--primary" id="addButton">
      Add Course
    </button>
  );
}

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
      instructor_name: "",
      site_id: "",
      location: "",
      minEndDate: new Date().toISOString().split("T")[0]
    };

    if (this.props.location.state !== undefined) {
      this.getCourse();
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.displayButtons = this.displayButtons.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target);
    data.append("description", this.state.description);

    if (this.props.location.state !== undefined) {
      data.append("course_id", this.props.location.state.course_id);
      axios
        .post("http://localhost:5000/editCourse", data)
        .then(response => {
          window.location.replace("/courses");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios
        .post("http://localhost:5000/addCourse", data)
        .then(response => {
          window.location.replace("/courses");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  getCourse() {
    const params = this.props.location.state.course_id;

    axios
      .get(`http://localhost:5000/findCourseById?course_id=${params}`)
      .then(response => {
        return response.data.courses.responseJson[0];
      })
      .then(res => {
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
          location: res.location,
          minEndDate: new Date(res.start_date.slice(0, 10))
            .toISOString()
            .split("T")[0]
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  displayButtons() {
    if (this.props.location.state !== undefined) {
      return <SaveButton />;
    } else {
      return <AddButton />;
    }
  }

  render() {
    return (
      <>
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
                    maxlength="45"
                    required
                    defaultValue={this.state.title}
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
                    min={new Date().toISOString().split("T")[0]}
                    onChange={event => {
                      this.setState({ start_date: event.target.value });
                      this.setState({
                        minEndDate: new Date(event.target.value)
                          .toISOString()
                          .split("T")[0]
                      });
                    }}
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
                    min={this.state.minEndDate}
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
                      <option value="DEFAULT" disabled></option>
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
                    config={{
                      heading: {
                        options: [
                          {
                            model: "paragraph",
                            view: { name: "h1", classes: "c-text-body" },
                            title: "Paragraph",
                            class: "ck-heading_paragraph"
                          },
                          {
                            model: "heading1",
                            view: { name: "h1", classes: "c-heading-charlie" },
                            title: "Heading 1",
                            class: "ck-heading_heading1"
                          },
                          {
                            model: "heading2",
                            view: { name: "h2", classes: "c-heading-delta" },
                            title: "Heading 2",
                            class: "ck-heading_heading2"
                          }
                        ]
                      }
                    }}
                    onChange={(event, editor) => {
                      this.setState({ description: editor.getData() });
                    }}
                  />
                </li>
                {this.displayButtons()}
              </ul>
            </fieldset>
          </form>
        </div>
      </>
    );
  }
}

export default Admin;
