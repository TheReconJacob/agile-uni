import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/searchBar.scss";
import { Dropdown } from "@sky-uk/toolkit-react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [sites, setSites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [siteId, setSiteId] = useState("");
  const [popup, setPopup] = useState(false);
  const [dropdownName, setDropdownName] = useState("Location");

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_SERVER_URL}/sites`)
      .then(response => {
        const listItems = [{ text: "Location", value: "" }];
        const sitesRaw = response.data;

        sitesRaw.forEach(site =>
          listItems.push({ text: site.name, value: site.id })
        );

        setSites(listItems);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSiteChange = event => {
    setSiteId(event.value);
    setDropdownName(event.text);
  };

  return (
    <div className="o-container">
      <form onSubmit={event => event.preventDefault()}>
        <fieldset>
          <ul className="c-form-list o-layout--spaced">
            <li className="c-form-list">
              <Dropdown
                name={dropdownName}
                items={sites}
                onChange={handleSiteChange}
                isOpen={popup}
                onClick={() => setPopup(!popup)}
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
                    onChange={event => setSearchTerm(event.target.value)}
                  />
                </div>
                <div className="c-form-combo__cell">
                  <Link
                    to={{
                      pathname: `/courses`,
                      search: `?searchTerm=${searchTerm}&site=${siteId}`
                    }}
                    className="c-btn c-btn--primary"
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
