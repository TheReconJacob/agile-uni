import React from "react";
import "./App.css";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { SimpleMasthead } from "@sky-uk/molecules";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import { ComboInput } from "@sky-uk/toolkit-react";
import DropdownLocation from "./Dropdown";
import { Hero } from "@sky-uk/toolkit-react";
import picture from "./hero.jpg";
import skyLogo from "./skyLogo.jpg";

function App() {
  let newValue;

  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <Router>
          <SimpleMasthead
            title={
              <div style={{ textAlign: "left", paddingLeft: 100 }}>
                <Link to="/courses">Courses</Link>
              </div>
            }
          />
          <Switch>
            <Route path="/">
            <Home />
            </Route>
            <Route path="/courses">
              <Courses />
            </Route>
          </Switch>
        </Router>
      </AzureAD>
    </>
  );
}

export default App;
