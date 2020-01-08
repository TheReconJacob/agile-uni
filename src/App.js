import React from "react";
import "./App.scss";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from "./pages/Admin";
import axios from "axios";

axios.interceptors.request.use(
  async config => {
    const token = await authProvider.getIdToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token.idToken.rawIdToken;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

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
        <Router>
          <Navbar />
          <div className="wrapper">
            <Route exact path="/" component={Home} />
            <Route
              path="/courses"
              render={props => (
                <Courses {...props} adminStatus={this.state.admin} />
              )}
            />
            {adminAddCourse}
          </div>
          <Footer className="stylefooter" />
        </Router>
      </>
    );
  }
}

export default App;
