import React, { Component } from "react";
import logo from "./logo.svg";
// import './App.css';
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { SimpleMasthead } from "@sky-uk/molecules";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ComboInput } from '@sky-uk/toolkit-react';
import { Accordion } from '@sky-uk/toolkit-react';
import { AccordionSection } from '@sky-uk/toolkit-react';

class Courses extends React.Component {
    constructor() {
    super();
     this.state = {
       accordionSelected: [],
       collapseOnToggle: true
     };
     this.updateAccordionSelection = this.updateAccordionSelection.bind(this);
    }

    updateAccordionSelection = selected => {
      this.setState({ accordionSelected: selected });
    };

    render() {

  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <div className="o-layout">
          <div
            className="o-layout__item"
            style={{
              height: 100,
              textAlign: "center",
              backgroundColor: "#ffb5b3"
            }}
          >
            <p>Courses</p>
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

//          description - where accordeon goes

            <Accordion
              id="accordion"
              selected={this.state.accordionSelected}
              updateSelection={this.state.updateAccordionSelection}
              collapseOnToggle={this.state.collapseOnToggle}
            >
              <AccordionSection title="Course 1" />
              <AccordionSection title="Course 2" />
            </Accordion>



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
}

export default Courses;
