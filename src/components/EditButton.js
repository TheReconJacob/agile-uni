import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Admin from "../pages/Admin"

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

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
            state: {id: this.props.id}
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