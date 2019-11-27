import React from "react";
import axios from "axios";


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
      window.location.reload();
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
        window.location.reload();
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
  confirmCancel() {
    var answer = window.confirm("Are you sure you want to cancel this course? Your place will be released.");
    if (answer) {
      cancelCourse(this.props.courseId, this.props.employeeId);
    } 
  }

  confirmBook() {
    var answer = window.confirm("You are about to book on to this course. Are you sure? Note that if you book a place on the course and you do not give 48hrs notice for cancellations, there may be a charge.");
    if (answer) { 
      bookCourse(this.props.courseId, this.props.employeeId);
    } 
  }

  render() {
    let BookComponent
    if (this.props.canBook) { 
      if (this.props.fullyBooked){
        BookComponent= (<button className="accordion-button c-btn u-margin-right is-disabled">
          Course Fully Booked
        </button>)
      }
      else{
        BookComponent= (<button onClick={this.confirmBook} className="accordion-button c-btn c-btn--primary u-margin-right">
        Book
      </button>)
    }}
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
