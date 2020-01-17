import React from "react";
import "../styles/admin.scss";
import axios from "axios";
import Button from "../components/reusable/Button";
import InputComponent from "../components/reusable/Input";

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
      minEndDate: new Date().toISOString().substring(0, 10)
    };

    if (this.props.location.state !== undefined) {
      this.getCourse();
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCourse = this.getCourse.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target);
    data.append("description", this.state.description);

    if (this.props.location.state !== undefined) {
      data.append("course_id", this.props.location.state.course_id);
      axios
        .post(`http://${process.env.REACT_APP_SERVER_URL}/editCourse`, data)
        .then(response => {
          window.location.replace("/courses");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      axios
        .post(`http://${process.env.REACT_APP_SERVER_URL}/addCourse`, data)
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
      .get(`http://${process.env.REACT_APP_SERVER_URL}/findCourseById?course_id=${params}`)
      .then(response => {
        return response.data;
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
          minEndDate: res.start_date.slice(0, 10)
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div className="o-container u-padding-bottom-large u-padding-top-large form-container ">
          <form onSubmit={this.handleSubmit}>
            <legend className="c-form-caption">Add courses</legend>

            <InputComponent
              multipleInputs={[
                [
                  "empty", // className
                  "text", // type
                  "title", // name
                  "Title", //labelText
                  45, //maxLength
                  true, //required
                  this.state.title, // defaultValue
                  "empty", // min
                  "empty" //onChange
                ],
                [
                  "empty",
                  "text",
                  "instructor_name",
                  "Instructor Name",
                  "empty",
                  true,
                  this.state.instructor_name,
                  "empty",
                  "empty"
                ],
                [
                  "dateInput",
                  "date",
                  "start_date",
                  "Start Date",
                  "empty",
                  true,
                  this.state.start_date,
                  new Date().toISOString().split("T")[0],
                  event => {
                    this.setState({ start_date: event.target.value });
                    this.setState({
                      minEndDate: new Date(event.target.value)
                        .toISOString()
                        .split("T")[0]
                    });
                  }
                ],
                [
                  "timeInput",
                  "time",
                  "start_time",
                  "empty",
                  "empty",
                  true,
                  this.state.start_time,
                  "empty",
                  "empty"
                ],
                [
                  "dateInput",
                  "date",
                  "end_date",
                  "End Date",
                  "empty",
                  true,
                  this.state.end_date,
                  this.state.minEndDate,
                  "empty"
                ],
                [
                  "timeInput",
                  "time",
                  "end_time",
                  "empty",
                  "empty",
                  true,
                  this.state.end_time,
                  "empty",
                  "empty"
                ],
                [
                  "empty",
                  "select",
                  "site_id",
                  "Site",
                  "empty",
                  true,
                  this.state.site_id,
                  "empty",
                  "empty",
                  [
                    {
                      value: "DEFAULT",
                      label: ""
                    },
                    {
                      value: "1",
                      label: "Osterley"
                    },
                    {
                      value: "2",
                      label: "Leeds"
                    },
                    {
                      value: "3",
                      label: "Livingston"
                    }
                  ]
                ],
                [
                  "empty",
                  "text",
                  "location",
                  "Location",
                  "empty",
                  true,
                  this.state.location,
                  "empty",
                  "empty"
                ],
                [
                  "empty",
                  "number",
                  "attendees_max",
                  "Maximum number of participants",
                  "empty",
                  true,
                  this.state.attendees_max,
                  0,
                  "empty"
                ],
                [
                  "empty",
                  "richText", // type
                  "empty",
                  "empty",
                  "empty",
                  "empty",
                  "empty",
                  "empty",
                  (event, editor) => {
                    this.setState({ description: editor.getData() }); //onChange
                  },
                  this.state.description // data,
                ]
              ]}
            />
            <Button
              text={this.props.location.state !== undefined ? "Save" : "Add"}
            />
          </form>
        </div>
      </>
    );
  }
}

export default Admin;
