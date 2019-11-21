import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import Admin from "../pages/Admin"

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

class EditButton extends React.Component {
  constructor() {
    super();
    this.redirectToAdmin = this.redirectToAdmin.bind(this); 
  }

  redirectToAdmin = () => {
    return <Redirect to="/admin"/>
}

  render() {

    let adminEditComponent
    if (this.props.adminStatus) {
        adminEditComponent=(<button onClick={this.redirectToAdmin} className="accordion-button c-btn c-btn--primary u-margin-right">Edit</button>)}
    return (
      <> 
       {adminEditComponent}
      </>
    );
  }
}


export default EditButton;