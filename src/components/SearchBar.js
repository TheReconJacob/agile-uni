import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/searchBar.scss";
import DropdownSite from "./Dropdown";
import { Link } from "react-router-dom";

function SearchBar() {
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [siteId, setSiteId] = useState("");

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_URL}/sites`)
      .then(sites => {
        if (Array.isArray(sites.data)) {
          setSites(sites.data);
        } else {
          console.log(sites.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSiteChange = event => {
    setSiteId(event.target.value);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="o-container">
      <form>
        <fieldset>
          <ul className="c-form-list o-layout--spaced">
            <li className="c-form-list">
              <DropdownSite
                optionsObjects={sites}
                handleOption={handleSiteChange}
              />
              <div className="c-form-combo--inline o-layout__item u-width-3/4">
                <div className="c-form-combo__cell">
                  <input
                    type="text"
                    name="searchTerm"
                    className="c-form-combo__input c-form-input"
                    placeholder="Search for your next course"
                    id="f-combo"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="c-form-combo__cell">
                  <Link
                    to={{
                      pathname: `/courses`,
                      search: `?searchTerm=${searchTerm}&site=${siteId}`
                    }}
                    className="c-form-combo__btn c-btn c-btn--primary"
                  >
                    Search
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </fieldset>
      </form>
    </div>
  );
}
export default SearchBar;
