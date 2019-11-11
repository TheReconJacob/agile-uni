import React from "react";
import "./App.scss";
import { AzureAD } from "react-aad-msal";
import { authProvider } from "./authProvider";
import Courses from "./pages/Courses";
import Home from "./pages/Home";
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import { Route, BrowserRouter as Router } from "react-router-dom";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <AzureAD provider={authProvider} forceLogin={true}>
        <Router>
          <Navbar />
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/courses" component={Courses} />
            <Route path="/admin" component={Admin} />
          </div>
          <Footer />
        </Router>
      </AzureAD>

    </>
    
  );
}

export default App;
