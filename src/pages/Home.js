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
import { Hero } from "@sky-uk/toolkit-react";
import picture from "./hero.jpg";
import skyLogo from "./skyLogo.jpg";

function App() {
  let newValue;

  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <div className="o-layout o-layout--spaced" style={{ padding: 30 }}>
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
          <div className="o-layout__item" style={{ padding: 30 }}>
            <Hero image={picture} />
          </div>
          <div className="o-layout__item" style={{ padding: 30 }}>
            <h2 className="c-heading-bravo">Welcome to the Agile Uni</h2>
            <p className="c-text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <div className="footer">
          <div>
            <img src={skyLogo} style={{ height: 40 }} />
          </div>
          <div>
            <p>Copyright 2019 Sky UK Ltd.</p>
          </div>
        </div>
      </AzureAD>
    </>
  );
}

export default App;
