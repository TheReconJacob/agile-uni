import React from "react";
import "./App.scss";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
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
    axios
      .post("http://localhost:5000/addEmployee", params)
      .then(function(response) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "employeeId",
            response.data.employees.responseJson.insertId
          );
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  componentDidMount() {
    this.addEmployee();
  }

  render() {
    let adminAddCourse;

    if (this.state.admin) {
      adminAddCourse = <Route path="/admin" component={Admin} />;
    } else {
      adminAddCourse = (
        <Route
          path="/admin"
          render={props => (
            <ErrorPage
              errorStatus="403"
              errorMessage="You do not have permission, try logging in as a different user"
            />
          )}
        />
      );
    }
    return (
      <>
        <Router>
          <Navbar />
          <div className="wrapper">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/courses"
                render={props => (
                  <Courses {...props} adminStatus={this.state.admin} />
                )}
              />
              {adminAddCourse}
                render={props => (
                  <ErrorPage
                    errorStatus="404"
                    errorMessage="We could not find the page you were looking for, try searching again"
                  />
                )}
              />
            </Switch>
          </div>
          <Footer className="stylefooter" />
        </Router>
      </>
    );
  }
}

export default App;
