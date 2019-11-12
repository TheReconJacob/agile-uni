import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from "./pages/Admin";
import IdTokenVerifier from 'idtoken-verifier';
var base64 = require('base-64');
var utf8 = require('utf8');

const verifier = new IdTokenVerifier({
  issuer: "https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237",
  audience: "c0fb79ba-b72c-47c1-912c-48ee6cbac972"
});

class App extends React.Component {
  constructor(props) {
    super(props);

    // We can add more state
    this.state = {
      admin: false,
    };

    if (localStorage.getItem('msal.idtoken') == null) {
      console.log("Not logged in");
    } else {
      var roles = this.getRoles();
      if (roles.includes('admin')) {
        this.state.admin = true;
      }
      console.log("This is admin boolean " + this.state.admin);
      verifier.verify(localStorage.getItem('msal.idtoken'), localStorage.getItem('msal.nonce.idtoken'), (error, payload) => {
        console.log("verifying idtoken failed");
    });
    }
  }

  getRoles() {
    let userRoles = [];
    var encodedData = localStorage.getItem('msal.idtoken');
    var blocks = encodedData.split('.');
    var croppedData = blocks[1];
    var bytes = base64.decode(croppedData);
    var userInfo = utf8.decode(bytes);
    var parsedInfo = JSON.parse(userInfo);
    // ['testy', 'admin']
    if (parsedInfo.roles != null) {
      userRoles = parsedInfo.roles;
    }
    console.log("User roles is " + userRoles);
    return userRoles;
  }

  render() {
    let adminComponent;
    let adminAddCourse;
    var adminS  = this.state.admin;
    if (this.state.admin) {
      adminComponent = <h1>HELLO ADMIN</h1>;
      adminAddCourse = <Route path="/admin" component={Admin} />;
    }
    return (
      <>
        <AzureAD provider={authProvider} forceLogin={true}>
          <Router>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/courses" render={()=><Courses adminStatus={adminS}/>}/>
              {adminAddCourse}
            </div>
            {adminComponent}
            <Footer />
          </Router>
        </AzureAD>

      </>

    );
  }
}

export default App;
