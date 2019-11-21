import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from "./pages/Admin";

const jwt = require("jsonwebtoken");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: false
    };

    this.getRoles().then(roles => {
      if (roles != null && roles.includes("admin")) {
        this.setState({
          admin: true
        });
      }
    });
  }

  async getRoles() {
    const token = await authProvider.getIdToken();
    const idToken = token.idToken.rawIdToken;
    const decodedToken = jwt.decode(idToken);

    if (decodedToken.roles !== undefined) {
      return decodedToken.roles;
    } else {
      return null;
    }
  }

  render() {
    let adminAddCourse;

    if (this.state.admin) {
      adminAddCourse = <Route path="/admin" component={Admin} />;
    }
    return (
      <>
        <AzureAD provider={authProvider} forceLogin={true}>
          <Router>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route
                path="/courses"
                render={(props) => <Courses {...props} adminStatus={this.state.admin} />}
              />
              {adminAddCourse}
            </div>
            <Footer />
          </Router>
        </AzureAD>
      </>
    );
  }
}

export default App;
