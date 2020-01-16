import React from "react";
import { Accordion } from "@sky-uk/toolkit-react";
import { AccordionSection } from "@sky-uk/toolkit-react";
import "../styles/courses.scss";
import DeleteButton from "../components/DeleteButton";
import EditButton from "../components/EditButton";
import BookButton from "../components/BookButton";
import CourseDescription from "../components/CourseDescription";
import DateDisplay from "../components/DateDisplay";
import axios from "axios";

const queryString = require("query-string");
let employeeId = localStorage.getItem("employeeId");
const [now] = new Date().toISOString().split("T");

class Courses extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      accordionSelected: [],
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
          courseTitleFragment: searchObj
        }
      };
    } else {
      params = {
        params: {
          courseTitleFragment: searchObj,
          site_id: siteObj
        }
      };
    }
    axios
      .get(`http://${process.env.REACT_APP_SERVER_URL}/search`, params)
      .then(courses => {
        resultsData = courses.data;
        self.setState({ results: resultsData });
      })
      .catch(error => {
        console.error(error);
      });
  };

  updateAccordionSelection = selected => {
    const self = this;
    this.setState({ accordionSelected: selected });
    try {
      const numberSelected = selected[0].replace("1-header-", "");
      const courseSelected = self.state.results[numberSelected];
      const max = courseSelected.attendees_max;

      axios
        .get(`http://${process.env.REACT_APP_SERVER_URL}/totalAttendees`, {
          course_id: courseSelected.id
        })
        .then(response => {
          if (max > response.data) {
            this.setState({ fullyBookedState: false });
          } else {
            this.setState({ fullyBookedState: true });
          }
        });
      axios
        .get(`http://${process.env.REACT_APP_SERVER_URL}/returnIfBooked`, {
          params: {
            azure_oid: employeeId,
            course_id: courseSelected.id
          }
        })
        .then(response => {
          if (response.data) {
            self.setState({ canBook: false });
          } else {
            self.setState({ canBook: true });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch {}
  };
  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.generateSearch();
  }

  componentDidMount() {
    this.generateSearch();
  }

  generateSearch() {
    const { searchTerm, siteId } = queryString.parse(
      this.props.location.search
    );
    if (!searchTerm && !siteId) {
      this.getSearch("", "");
    } else {
      this.getSearch(searchTerm, siteId);
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
                  id={res.id}
                  title={res.title}
                >
                  <div className="">
                    <div className="o-layout__item" style={{ display: "flex" }}>
                      <DateDisplay date={res.start_date} title={"Start"} />
                      <p className="c-text-body o-layout__item">
                        <b>Location: {res.location}</b>
                      </p>
                    </div>
                    <h2 className="c-heading-delta o-layout__item">
                      {res.title}
                    </h2>
                    <CourseDescription
                      CourseDescription={res.description}
                      courseId={res.id}
                    />
                    <div className="accordion-button-box">
                      <a
                        href="mailto:agileuniversity@sky.uk"
                        className="accordion-button c-btn c-btn--primary u-margin-right"
                      >
                        Request more information
                      </a>
                      <EditButton
                        adminStatus={adminStatus}
                        course_id={res.id}
                      />
                      <BookButton
                        courseId={res.id}
                        canBook={this.state.canBook}
                        employeeId={employeeId}
                        fullyBooked={this.state.fullyBookedState}
                        startDate={res.start_date}
                        currentDate={this.state.currentDate}
                      />
                      <DeleteButton
                        courseToDelete={res.id}
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
