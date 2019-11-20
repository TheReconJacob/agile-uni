import React from "react";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

function deleteCourse(courseID) {
  axios
    .get("http://localhost:5000/delete", {
      params: {
        courseId: courseID
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

class DeleteButton extends React.Component {
  constructor() {
    super();
  }

  confirmDelete() {
    var answer = window.confirm("Save data?");
    if (answer) {
      // console.log("successfully deleted");
      deleteCourse("35");
    } else {
      //some code
    }
  }

  render() {
    let adminDeleteComponent;
    console.log("id to delete" + this.props.courseToDelete);
    if (this.props.adminStatus) {
      adminDeleteComponent = (
        <button
          onClick={this.confirmDelete}
          className="accordion-button c-btn c-btn--primary u-margin-right"
        >
          Delete
        </button>
      );
    }

    return <>{adminDeleteComponent}</>;
  }
}

export default DeleteButton;
