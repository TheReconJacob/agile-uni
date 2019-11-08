import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <Router>
          <Navbar />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/courses" component={Courses} />
          </div>
          <Footer />
        </Router>
      </AzureAD>

    </>
    
  );
}

export default App;
