import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

function App() {
  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/courses">
              <Courses />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AzureAD>
    </>
  );
}

export default App;
