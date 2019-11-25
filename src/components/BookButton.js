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
    this.bookAndRefresh = this.bookAndRefresh.bind(this);
    this.cancelAndRefresh =this.cancelAndRefresh.bind(this);
  }
 

  confirmBook(_callback) {
    var answer = window.confirm("Are you sure you want to book this course?");
    if (answer) { 
      bookCourse(this.props.courseId, this.props.employeeId);
    } 
    _callback();
  }

  bookAndRefresh(){this.confirmBook(function(){
    window.location.reload();
  });
}

  confirmCancel(_callback) {
    var answer = window.confirm("Are you sure you want to cancel this course?");
    if (answer) {
      cancelCourse(this.props.courseId, this.props.employeeId);
    } 
    _callback();
  }

  cancelAndRefresh(){this.confirmCancel(function(){
    window.location.reload();
  });
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
