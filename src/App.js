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
import axios from "axios";

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

    this.addEmployee = this.addEmployee.bind(this);
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

  async addEmployee() {
    const token = await authProvider.getIdToken();
    const idToken = token.idToken.rawIdToken;
    const decodedToken = jwt.decode(idToken);
    let params = {
      name: decodedToken.name,
      object_id: decodedToken.oid,
      email: decodedToken.preferred_username
    };
    console.log(params);
    axios
      .post("http://localhost:5000/addEmployee", params)
      .then(function(response) {
        console.log(response);
        if (typeof window !== 'undefined') {
        localStorage.setItem("employeeId",response.data.employees.responseJson.insertId);
      }})
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.addEmployee();
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
            <Footer className="stylefooter"/>
          </Router>
        </AzureAD>
      </>
    );
  }
}

export default App;
