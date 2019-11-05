import React from "react";
import "./App.css";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { SimpleMasthead } from "@sky-uk/molecules";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./Courses";
import { ComboInput } from "@sky-uk/toolkit-react";
import DropdownLocation from "./Dropdown";

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
            <Route path="/courses">
              <Courses />
            </Route>
          </Switch>
        </Router>
        <div className="o-layout o-layout--spaced">
          <div className="o-layout__item u-width-1/4">
            <DropdownLocation />
          </div>
          <div className="o-layout__item u-width-3/4">
            <ComboInput
              cssClassName="search"
              onChange={value => {
                newValue = value;
              }}
              onButtonClick={() => {
                console.log(newValue);
              }}
            />
          </div>
          <div
            className="o-layout__item"
            style={{
              height: 300,
              textAlign: "center",
              backgroundColor: "#ccffb3"
            }}
          >
            <p>{newValue}</p>
          </div>
          <div
            className="o-layout__item"
            style={{
              height: 400,
              textAlign: "center",
              backgroundColor: "#b3f6ff"
            }}
          >
            <p>Description</p>
          </div>
          <div
            className="o-layout__item"
            style={{ textAlign: "center", backgroundColor: "#e0b5ff" }}
          >
            <p>Footer</p>
          </div>
        </div>
      </AzureAD>
    </>
  );
}

export default App;
