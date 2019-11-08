import React from 'react';
import logo from './logo.svg';
//import {ExampleAdmin} from './pages/ExampleAdmin';
//import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import './App.css';
import './App.scss';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';
var base64 = require('base-64');
var utf8 = require('utf8');


class App extends React.Component {
  constructor(props) {
    super(props);

    // We can add more state
    this.state = {
      admin: false,
    };

    if (localStorage.getItem('msal.idtoken') == null) {
      console.log("Not logged in");
    } else {
      var roles = this.getRoles();
      if (roles.includes('admin')) {
        this.state.admin = true;
      }
      console.log(this.state.admin);
    }
  }

  getRoles() {
    let userRoles = [];
    var encodedData = localStorage.getItem('msal.idtoken');
    var blocks = encodedData.split('.');
    var croppedData = blocks[1];
    var bytes = base64.decode(croppedData);
    var userInfo = utf8.decode(bytes);
    var parsedInfo = JSON.parse(userInfo);
    // ['testy', 'admin']
    if (parsedInfo.roles != null) {
      userRoles = parsedInfo.roles;
    }
    console.log("User roles is " + userRoles);
    return userRoles;
  }


  render() {
    let adminComponent;
    if (this.state.admin) {
      adminComponent = <h1>HELLO ADMIN</h1>;
    }
    return (
      <AzureAD provider={authProvider} forceLogin={true}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p className="c-heading-beta">
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          {adminComponent}
          {/* <Router>
            <Switch>
              <Route path="/ExampleAdmin" allowed={['admin']}>
                <ExampleAdmin />
              </Route>
            </Switch>
          </Router> */}
        </div>
      </AzureAD>

    );
  }

}

export default App;

