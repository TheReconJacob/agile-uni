import React from "react";
import { Accordion } from "@sky-uk/toolkit-react";
import { AccordionSection } from "@sky-uk/toolkit-react";
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";
import DeleteButton from "../components/DeleteButton";

const CourseIdContext = React.createContext('0');

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
    let adminEditComponent;
    if (this.props.adminStatus) {
      adminAddComponent = (
        <a href="/admin">
          <button className="c-btn c-btn--primary c-btn--full u-margin-bottom">
            <img
              className="c-btn__icon"
              src="https://www.sky.com/assets/toolkit/docs/buttons/example.svg"
              alt="Example Icon"
            />
            Add a new course
          </button>
        </a>
      );
      adminEditComponent = (
        <a
          href="/admin"
          className="accordion-button c-btn c-btn--primary u-margin-right"
        >
          Edit
        </a>
      );
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
                <CourseIdContext.Provider value="1">

                <div className="">
                  <h2 className="c-heading-delta o-layout__item">Title</h2>
                  <p className="c-text-body o-layout__item">Description</p>
                  <div className="accordion-button-box">
                    <a
                      href="mailto:agileuniversity@sky.uk"
                      className="accordion-button c-btn c-btn--primary u-margin-right"
                    >
                      Request more information
                    </a>
                    <a
                      href="/courses"
                      className="accordion-button c-btn c-btn--primary u-margin-right"
                    >
                      Book now
                    </a>
                    static contextType = CourseIdContext;
                    <DeleteButtonHighLevel adminStatus={this.props.adminStatus}/>
                  </div>
                </div>
                </CourseIdContext.Provider>
              </AccordionSection>
              <AccordionSection
                className="accordion-section"
                id="2"
                title="Section 2"
              />
            </Accordion>
          </div>
        </div>
      </>
    );
  }
}

class DeleteButtonHighLevel extends React.Component{
  static contextType = CourseIdContext;
  render(){
    let adminComponents;
    if (this.props.adminStatus) {
      adminComponents=(
      <>
        <DeleteButton courseToDelete={this.context} />
        <a href="/admin" className="accordion-button c-btn c-btn--primary u-margin-right">
          Edit
        </a>
      </>
      )
    }
    return(
      <>
      {adminComponents}
      </>
  )
  }
}

export default Courses;
