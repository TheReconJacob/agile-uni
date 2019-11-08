import React from "react";
import "../App.scss";
import { Hero } from "@sky-uk/toolkit-react";
import picture from "../images/hero.jpg";
import SearchBar from "../components/SearchBar.js";
import { Switch, Route } from 'react-router-dom';

class Home extends React.Component {

  render() {
    return (
      <>
        <SearchBar />
        <div className="o-layout o-layout--spaced" style={{ padding: 30 }}>
          <div className="o-layout__item" style={{ padding: 30 }}>
            <Hero image={picture} />
          </div>
          <div className="o-layout__item" style={{ padding: 30 }}>
            <h2 className="c-heading-bravo">Welcome to the Agile Uni</h2>
            <p className="c-text-body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default Home;