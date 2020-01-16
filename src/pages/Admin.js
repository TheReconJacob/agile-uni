import React, { useState, useEffect } from "react";
import "../styles/admin.scss";
import axios from "axios";
import FormBuilder from "../components/FormBuilder/FormBuilder.js";
const AdminFormJSON = require("../forms/AdminForm.json");

function Admin() {
  const [courseObject, setCourseObject] = useState({});
  const globalState = "add";

  useEffect(() => {
    if (globalState !== "add") {
      getCourse();
    }
  }, []);

  const getCourse = () => {
    const course_id = globalState;

    axios
      .get(`http://localhost:5000/findCourseById`, { params: { course_id } })
      .then(response => {
        setCourseObject(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.persist();
    const data = new FormData(event.target);

    if (globalState !== "add") {
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
  };

  return (
    <>
      <h1 style={{ fontSize: "48px", textAlign: "center", margin: "1%" }}>
        {globalState === "add" ? "Create a Course" : "Edit Course"}
      </h1>
      <FormBuilder
        style={{ marginLeft: "15%", marginRight: "15%" }}
        json={AdminFormJSON}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Admin;
