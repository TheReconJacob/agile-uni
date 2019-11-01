import React from 'react';
import logo from './logo.svg';
// import './App.css';
import './App.scss';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './authProvider';


function App() {
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
