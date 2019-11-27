import React from "react";
import { Accordion } from "@sky-uk/toolkit-react";
import { AccordionSection } from "@sky-uk/toolkit-react";
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import BookButton from "../components/BookButton";
import CourseDescription from "../components/CourseDescription";
import axios from "axios";
const queryString = require("query-string");
let employeeId = localStorage.getItem("employeeId");
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("msal.idtoken");

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accordionSelected: [],
      searchParam: "",
      site: "",
      results: [],
      dataPresent: true,
      canBook: true,
      fullyBookedState: false
    };
    this.updateAccordionSelection = this.updateAccordionSelection.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.generateSearch = this.generateSearch.bind(this);
  }

  getSearch = (searchObj, siteObj) => {
    let params;
    let resultsData;
    const self = this;
    if (!siteObj) {
      params = {
        params: {
          searchTerm: searchObj
        }
      };
    } else {
      params = {
        params: {
          searchTerm: searchObj,
          siteId: siteObj
        }
      };
    }
    axios
      .get("http://localhost:5000/search", params)
      .then(function(response) {
        resultsData = response.data.courses.responseJson;
        self.setState({ results: resultsData });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  updateAccordionSelection = selected => {
    const self = this;
    this.setState({ accordionSelected: selected });
    try{
    var numberSelected = selected[0].replace('1-header-','');
    let courseSelected= self.state.results[numberSelected].course_id;
    let max= self.state.results[numberSelected].attendees_max;
    let number= self.state.results[numberSelected].attendees_booked;
    if(max>number){
    this.setState({ fullyBookedState: false });}
    else {this.setState({ fullyBookedState: true });}
    axios
      .get("http://localhost:5000/returnIfBooked", { 
        params: {
          employee_id: employeeId, 
          course_id: courseSelected
          }
        })
      .then(function(response) {
        let responseShortened = response.data.course_attendees.responseJson[0];
        for(var key in responseShortened){
          if(responseShortened[key]===1){
            self.setState({canBook: false})
          }
          else{self.setState({canBook: true})}
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  catch{}
  };
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.generateSearch();
  }

  componentDidMount() {
    this.generateSearch();
  }

  generateSearch() {
    if (
      !queryString.parse(this.props.location.search).searchTerm &&
      !queryString.parse(this.props.location.search).site
    ) {
      this.getSearch("", "");
    } else {
      this.state.searchParam = queryString.parse(
        this.props.location.search
      ).searchTerm;
      this.state.site = queryString.parse(this.props.location.search).site;
      this.getSearch(this.state.searchParam, this.state.site);
    }
  }

  render() {
    const parentId = "1";
    let adminAddComponent;
    let adminStatus = this.props.adminStatus;
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

    return (
      <>
        <div className="c-hero hero-background">
          <div className="hero-title">
            <p className="hero-title-text">Find your next course...</p>
            <SearchBar />
          </div>
        </div>

        <div className="o-container course-page-accordion">
          <div className="o-layout">{adminAddComponent}</div>
          <Accordion
            id={parentId}
            collapseOnToggle
            selected={this.state.accordionSelected}
            updateSelection={this.updateAccordionSelection}
            isNested="true"
          >
            {this.state.results.map(function(res) {
              return (
                <AccordionSection
                  className="accordion-section"
                  id={res.course_id}
                  title={res.title}
                >
                  <div className="">
                    <div className="o-layout__item" style={{ display: "flex" }}>
                      <p className="c-text-body o-layout__item">
                        <b>Start: {res.start_date}</b>
                      </p>
                      <p className="c-text-body o-layout__item">
                        <b>End: {res.end_date}</b>
                      </p>
                      <p className="c-text-body o-layout__item">
                        <b>Location: {res.location}</b>
                      </p>
                    </div>
                    <h2 className="c-heading-delta o-layout__item">
                      {res.title}
                    </h2>
                    <CourseDescription CourseDescription={res.description} courseId={res.course_id}/>
                    <div className="accordion-button-box">
                      <a
                        href="mailto:agileuniversity@sky.uk"
                        className="accordion-button c-btn c-btn--primary u-margin-right"
                      >
                        Request more information
                      </a>
                      <EditButton
                        adminStatus={adminStatus}
                        course_id={res.course_id}
                      />
                      <BookButton courseId={res.course_id} canBook={this.state.canBook} employeeId={employeeId} fullyBooked={this.state.fullyBookedState}/>
                      <DeleteButton
                        courseToDelete={res.course_id}
                        adminStatus={adminStatus}
                      />
                    </div>
                  </div>
                </AccordionSection>
              );
            }, this)}
          </Accordion>
        </div>
      </>
    );
  }
}

export default Courses;
