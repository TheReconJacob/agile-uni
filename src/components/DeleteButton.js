import React from "react";
import axios from "axios";

function deleteCourse(courseID) {
  axios
    .get("http://localhost:5000/deleteCourse", {
      params: {
        courseId: courseID
      }
    })
    .then(function(response) {
      window.location.reload();
    })
    .catch(function(error) {
      console.error(error);
    });
}
class DeleteButton extends React.Component {
  constructor() {
    super();
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  confirmDelete() {
    var answer = window.confirm("Are you sure you want to delete this course?");
    if (answer) {
      deleteCourse(this.props.courseToDelete);
    }
  }

  render() {
    let adminDeleteComponent;
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
