import React from "react";
import { Link } from "react-router-dom";
import agileUniLogo from "../images/agileUniLogo.png";
import "../styles/navbar.scss";

function Navbar() {
    return (
      <nav>
        <div className="c-simple-masthead">
          <div className="c-simple-masthead__inner o-container">
            <img
              className="c-simple-masthead__logo o-layout__item u-width-1/4 navbar-logo"
              src={agileUniLogo}
              sizes="100vw"
              alt="Agile Uni Logo"
            />
            <div className="c-simple-masthead__title o-layout__item u-width-3/4 navbar-items">
              <div>
                <ul className="navbar-link-items">
                  <li className="navbar-link-item">
                    <Link className="navbar-link-color c-heading-delta" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="navbar-link-item">
                    <Link
                      className="navbar-link-color c-heading-delta"
                      to="/courses"
                    >
                      Courses
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Navbar;
