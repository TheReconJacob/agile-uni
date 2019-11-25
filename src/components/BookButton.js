import React from "react";
import axios from "axios";

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

function bookCourse(courseID, employeeID) { 
  axios
    .get("http://localhost:5000/addAttendee", { 
      params: {
        courseid: courseID,
        employeeid: employeeID
      }
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function cancelCourse(courseID, employeeID) { 
    axios
      .get("http://localhost:5000/deleteAttendee", { 
        params: {
          courseid: courseID,
          attendeeid: employeeID
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

class BookButton extends React.Component {
  constructor() {
    super();
    this.confirmBook = this.confirmBook.bind(this);
    this.confirmCancel = this.confirmCancel.bind(this);
  }
 

  confirmBook() {
    var answer = window.confirm("Are you sure you want to book this course?");
    if (answer) {
      console.log("trying to book " + this.props.courseId); 
      bookCourse(this.props.courseId, this.props.employeeId);
    } 
  }

  confirmCancel() {
    var answer = window.confirm("Are you sure you want to cancel this course?");
    if (answer) {
      console.log("trying to cancel " + this.props.courseId); 
      cancelCourse(this.props.courseId, this.props.employeeId);
    } 
  }

  render() {
    let BookComponent
    if (this.props.notAlreadyBooked) { //to integrate with the rest in card 138
    BookComponent= (<button onClick={this.confirmBook} className="accordion-button c-btn c-btn--primary u-margin-right">
    Book
  </button>)
    }
    else{
        BookComponent= (<button onClick={this.confirmCancel} className="accordion-button c-btn c-btn--primary u-margin-right">
        Cancel booking
      </button>)
    }
    return (
      <> 
       {BookComponent}
      </>
    );
  }
}

export default BookButton;
