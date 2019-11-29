import React from "react";
import { Accordion } from "@sky-uk/toolkit-react";
import { AccordionSection } from "@sky-uk/toolkit-react";
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import BookButton from "../components/BookButton";
import CourseDescription from "../components/CourseDescription";
import DateDisplay from "../components/DateDisplay";
import axios from "axios";
import moment from 'moment'; 

const queryString = require("query-string");
let employeeId = localStorage.getItem("employeeId");
const now = moment().format("YYYY-MM-DD");

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
      fullyBookedState: false,
      currentDate: now
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
        console.error(error);
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
        console.error(error);
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
      this.setState({searchParam: queryString.parse(this.props.location.search).searchTerm})
      this.setState({site: queryString.parse(this.props.location.search).site})
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
                      <DateDisplay start_date={res.start_date} end_date={res.end_date}/>
                      {/* <p className="c-text-body o-layout__item">
                        <b>Start: {new Intl.DateTimeFormat('en-GB', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: '2-digit' 
            }).format(Date.parse(res.start_date))} at {res.start_date.slice(11, 16)}
                        </b>
                      </p>
                      <p className="c-text-body o-layout__item">
                      <b>End: {new Intl.DateTimeFormat('en-GB', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: '2-digit' 
                          }).format(Date.parse(res.end_date))} at {res.end_date.slice(11, 16)}
                        </b>
                      </p> */}
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
                      <BookButton courseId={res.course_id} canBook={this.state.canBook} employeeId={employeeId} fullyBooked={this.state.fullyBookedState} startDate={res.start_date} currentDate={this.state.currentDate}/>
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
