import React from "react";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

function deleteCourse(courseID) {
  axios
    .get("http://localhost:5000/deleteCourse", {
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
    this.confirmDelete = this.confirmDelete.bind(this);
  }
 

  confirmDelete() {
    var answer = window.confirm("Are you sure you want to delete this course?");
    if (answer) {
      console.log("trying to delete " + this.props.courseToDelete);
      deleteCourse(this.props.courseToDelete);
    } 
  }

  render() {
    return (
      <> 
        <button onClick={this.confirmDelete} className="accordion-button c-btn c-btn--primary u-margin-right">
          Delete
        </button>
        
      </>
    );
  }
}

export default DeleteButton;
