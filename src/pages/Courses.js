import React from "react";
import { Accordion } from "@sky-uk/toolkit-react";
import { AccordionSection } from "@sky-uk/toolkit-react";
import SearchBar from "../components/SearchBar";
import "../styles/courses.scss";
import DeleteButton from "../components/DeleteButton";
import BookButton from "../components/BookButton"
import axios from "axios";
const queryString = require("query-string");

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
      dataPresent: true
    };
    this.updateAccordionSelection = this.updateAccordionSelection.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.getSearch = this.getSearch.bind(this);
    this.generateSearch = this.generateSearch.bind(this)
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
    this.setState({ accordionSelected: selected });
  };

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.generateSearch()
  }

  componentDidMount() {
    
    this.generateSearch()
  }

  generateSearch(){
    console.log(queryString.parse(
      this.props.location.search
    ).searchTerm)
    if(!queryString.parse(this.props.location.search).searchTerm && !queryString.parse(this.props.location.search).site) {
        this.getSearch("", "");
    } else {
      this.state.searchParam = queryString.parse(
        this.props.location.search
      ).searchTerm;
      this.state.site = queryString.parse(
        this.props.location.search
      ).site;
      this.getSearch(this.state.searchParam, this.state.site);
    }

  }

  render() {
    const parentId = "1";
    let adminAddComponent;
    let adminEditComponent;
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
                    <p className="c-text-body o-layout__item">
                      {res.description}
                    </p>
                    <div className="accordion-button-box">
                      <a
                        href="mailto:agileuniversity@sky.uk"
                        className="accordion-button c-btn c-btn--primary u-margin-right"
                      >
                        Request more information
                      </a>
                      <BookButton courseId={res.course_id} notAlreadyBooked={true} employeeId={1}/>
                      <DeleteButton
                        courseToDelete={res.course_id}
                        adminStatus={adminStatus}
                      />
                      {adminEditComponent}
                    </div>
                  </div>
                </AccordionSection>
              );
            })}
          </Accordion>
        </div>
      </>
    );
  }
}

export default Courses;
