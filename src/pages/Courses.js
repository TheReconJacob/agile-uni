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
    const parentId = "0";
    let adminAddComponent;
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
    }

    const elements = ['1','2','3','4'];

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
              collapseOnToggle="false"
              selected={this.state.accordionSelected}
              updateSelection={this.updateAccordionSelection}
              isNested="false"
            >
              {elements.map((value, index) => {
                return (  
                  <AccordionSection
                    className="c-accordion__section"
                    id={value}
                    title={"Section "+value}
                  >
                    <CourseIdContext.Provider value={value}>
                      <ACourseSection adminStatus={this.props.adminStatus}/>
                    </CourseIdContext.Provider>
                  </AccordionSection>
                  )
              })}
            </Accordion>
          </div>
        </div>
      </>
    );
  }
}

class ACourseSection extends React.Component{
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
        <div className="">
        <h2 className="c-heading-delta o-layout__item">Title {this.context}</h2>
        <p className="c-text-body o-layout__item">Description {this.context}</p>
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
          {adminComponents}
        </div>
      </div>
      </>
  )
  }
}

export default Courses;
