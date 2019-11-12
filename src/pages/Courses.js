import React from "react";
import { Accordion } from '@sky-uk/toolkit-react';
import { AccordionSection } from '@sky-uk/toolkit-react';
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";

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
    let adminAddComponent;
    let adminDeleteComponent;
    let adminEditComponent;
    if (this.props.adminStatus) {
      adminAddComponent = <a href="/admin">
                         <button class="c-btn c-btn--primary c-btn--full u-margin-bottom">
                            <img class="c-btn__icon" src="https://www.sky.com/assets/toolkit/docs/buttons/example.svg" alt="Example Icon" />
                            Add a new course
                          </button>
                        </a>;
      adminDeleteComponent = <a href="#" class="accordion-button c-btn c-btn--primary u-margin-right">Delete</a>;
      adminEditComponent = <a href="/admin" class="accordion-button c-btn c-btn--primary u-margin-right">Edit</a>;
    }

    return (
      <>

      <div className="c-hero hero-background">
        <div className="hero-title">
          <p className="hero-title-text">Find your next course...</p>
          <SearchBar />
        </div>
      </div>

        <div className="o-container course-page-accordion">
          <div className="o-layout">
          {adminAddComponent}
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
                    <a href="mailto:agileuniversity@sky.uk" class="accordion-button c-btn c-btn--primary u-margin-right">Request more information</a>
                    <a href="#" class="accordion-button c-btn c-btn--primary u-margin-right">Book now</a>
                    {adminDeleteComponent}
                    {adminEditComponent}
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
