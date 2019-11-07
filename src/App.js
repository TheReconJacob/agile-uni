import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './App.scss';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';
var base64 = require('base-64');
var utf8 = require('utf8');


function App() {

  var encodedData = localStorage.getItem('msal.idtoken');
  var blocks = encodedData.split('.');
  var croppedData = blocks[1];
  var bytes = base64.decode(croppedData);
  var userInfo = utf8.decode(bytes);
  //console.log(userInfo);
  var parsedInfo = JSON.parse(userInfo);
  //console.log(parsedInfo);
  var userRoles = parsedInfo.roles;
  //console.log(userRoles);

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
      </div>
    </AzureAD>

  );
}

export default App;
