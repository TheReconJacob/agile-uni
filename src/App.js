import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import { Route, BrowserRouter as Router } from "react-router-dom";
var base64 = require('base-64');
var utf8 = require('utf8');

class App extends React.Component {
  constructor(props) {
    super(props);

    // We can add more state
    this.state = {
      admin: false,
    };

    var roles = this.getRoles();
    if (roles.includes('admin')) {
      this.state.admin = true;
    }
    console.log(this.state.admin);
  }

  getRoles() {
    var encodedData = localStorage.getItem('msal.idtoken');
    var blocks = encodedData.split('.');
    var croppedData = blocks[1];
    var bytes = base64.decode(croppedData);
    var userInfo = utf8.decode(bytes);
    var parsedInfo = JSON.parse(userInfo);
    // ['testy', 'admin']
    var userRoles = parsedInfo.roles;
    console.log(userRoles);
    return userRoles;
  }


  render() {
    return (
      <>
        <AzureAD provider={authProvider} forceLogin={true}>
          <Router>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/courses" component={Courses} />
            </div>
            <Footer />
          </Router>
        </AzureAD>

      </>

    );
  }

}

export default App;

