import React from "react";


class DeleteButton extends React.Component {
    constructor() {
      super();
    }
  
    render() {
  
      let adminDeleteComponent;
      console.log("id to delete"+this.props.courseToDelete);
      if (this.props.adminStatus) {
        adminDeleteComponent = <a href="courses" className="accordion-button c-btn c-btn--primary u-margin-right">Delete</a>;
      }
  
      return (
        <>
        {adminDeleteComponent}
        </>
      );
    }
  }
  
  export default DeleteButton;