import React from "react";

class DeleteButton extends React.Component {
  constructor() {
    super();
  }

  confirmDelete() {

    
    var answer = window.confirm("Save data?");
    if (answer) {
      //some code
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
