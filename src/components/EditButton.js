import React from "react";
import {Redirect} from "react-router-dom";


class EditButton extends React.Component {
  constructor() {
    super();
    this.state = {
        redirect: false
    }
    this.redirectToAdmin = this.redirectToAdmin.bind(this); 
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  redirectToAdmin = (props) => {
    if (this.state.redirect) {
        return <Redirect to={{
            pathname: "/admin",
            state: {course_id: this.props.course_id}
        }}/>
      }
    
}

  render() {

    let adminEditComponent
    if (this.props.adminStatus) {
        adminEditComponent=(<button onClick={this.setRedirect} className="accordion-button c-btn c-btn--primary u-margin-right">Edit</button>)}
    return (
      <> 
      {this.redirectToAdmin()}
       {adminEditComponent}
      </>
    );
  }
}


export default EditButton;