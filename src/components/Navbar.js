import React from "react";
import { Link } from "react-router-dom";
import agileUniLogo from "../images/agileUniLogo.png";
import SearchBar from "../components/SearchBar.js";

class Navbar extends React.Component {
  render() {
    return (
      <nav>
        <div className="c-simple-masthead">
          <div className="c-simple-masthead__inner o-container">
            <div>
              <img
                className="c-simple-masthead__logo u-width-1/4"
                src={agileUniLogo}
                sizes="100vw"
              />
              <span className="c-simple-masthead__title">
                <div>
                  <a class="o-layout__item u-width-1/4">
                    <Link style={{ color: "#212529" }} to="/">
                      Home
                    </Link>
                  </a>
                  <a class="o-layout__item u-width-1/4">
                    <Link style={{ color: "#212529" }} to="/courses">
                      Courses
                    </Link>
                  </a>
                </div>
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
