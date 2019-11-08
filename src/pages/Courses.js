import React, { Component } from "react";
import { ComboInput } from '@sky-uk/toolkit-react';
import { Accordion } from '@sky-uk/toolkit-react';
import { AccordionSection } from '@sky-uk/toolkit-react';
import { Switch, Route } from 'react-router-dom';
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";
// import Hero from "../components/Hero.js";
import { Hero } from "@sky-uk/toolkit-react";
import picture from "../images/hero.jpg";

class Courses extends React.Component {
  constructor() {
    super();
    this.state = {
      accordionSelected: []
    };
    this.updateAccordionSelection = this.updateAccordionSelection.bind(this);
  }

  updateAccordionSelection = selected => {
    this.setState({ accordionSelected: selected });
  };

  render() {

    const parentId = "1";

    return (
      <>
        <SearchBar />

        <div className="c-hero hero-background">
        {/* <div class="c-hero__caption"> */}
            <div className="hero-title">
                <p className="hero-title-text">Courses</p>
            </div>
            {/* </div> */}
        </div>

        <div className="o-container course-page-accordion">
          <div className="o-layout">
            <Accordion
              id={parentId}
              collapseOnToggle
              selected={this.state.accordionSelected}
              updateSelection={this.updateAccordionSelection}
              isNested="true"
            >
              <AccordionSection
                className="accordion-section"
                id="1"
                title="Section 1"

              >
                <div className="">
                  <h2 className="c-heading-delta o-layout__item">
                    Title
                </h2>
                  <p className="c-text-body o-layout__item">
                    Description
                </p>
                  <div className="accordion-button-box">
                    <a href="mailto:agileuniverity@sky.uk" class="accordion-button c-btn c-btn--primary u-margin-right">Request more information</a>
                    <a href="#" class="accordion-button c-btn c-btn--primary u-margin-right">Book now</a>
                  </div>
                </div>



              </AccordionSection>
              <AccordionSection
                className="accordion-section"
                id="2"
                title="Section 2"
              >

              </AccordionSection>
            </Accordion>
          </div>
        </div>


      </>
    );
  }
}

export default Courses;
