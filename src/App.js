import React from "react";
import logo from "./logo.svg";
// import './App.css';
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { SimpleMasthead } from "@sky-uk/molecules";
import { Link } from "@sky-uk/toolkit-react";

function App() {
  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <>
          <SimpleMasthead />
        </>
        <div className="o-layout">
          <div
            className="o-layout__item"
            style={{
              height: 100,
              textAlign: "center",
              backgroundColor: "#ffb5b3"
            }}
          >
            <p>Header</p>
          </div>
          <div
            className="o-layout__item"
            style={{ textAlign: "center", backgroundColor: "#fffab3" }}
          >
            <p>Search bar</p>
          </div>
          <div
            className="o-layout__item"
            style={{
              height: 300,
              textAlign: "center",
              backgroundColor: "#ccffb3"
            }}
          >
            <p>Image</p>
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
