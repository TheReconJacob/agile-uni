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

// var jwt = require('jsonwebtoken');
// const jwksClient = require('jwks-rsa')
var base64 = require('base-64');
var utf8 = require('utf8');
const oicdUrl = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration"

// trying new method here

// const request = async url => {
//   const token = await authProvider.getAccessToken();

//   return fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + token.accessToken,
//       'Content-Type': 'application/json',
//     },
//   });
// };
// end of new method

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
      console.log("This is admin boolean " + this.state.admin);
    }
  }

  async getSigningKey() {
    const token = await authProvider.getAccessToken()
    console.log(token.accessToken);

    // const decodedToken = jwt.decode(token.scopes)
    // const kid = decodedToken.kid
    // console.log(decodedToken);
  }

  async getIdToken() {
    const token = await authProvider.getIdToken()
    console.log(token)
    // const decodedToken = jwt.decode(token)
    // const kid = decodedToken.kid
    // console.log(decodedToken);
  }



  // async getJwksUrl() {

  //   //do error handling
  //   const oicdRes = await fetch(oicdUrl)
  //   const oicdJson = await oicdRes.json()
  //   return jwksUri = oicdJson.jwks_uri
  //   // const jwksRes = await fetch(jwksUri)
  //   // const jwksJson = await jwksRes.json()
  //   // console.log(jwksJson.keys)

  // }



  // verifyAccessToken() {
  //   const token = await authProvider.getAccessToken();
  //   const token = token.accessToken;
  //   var x5cString = 'MIIDBTCCAe2gAwIBAgIQaD0+a2FNl5JMaE2/7KUP5zANBgkqhkiG9w0BAQsFADAtMSswKQYDVQQDEyJhY2NvdW50cy5hY2Nlc3Njb250cm9sLndpbmRvd3MubmV0MB4XDTE3MTEyODAwMDAwMFoXDTE5MTEyOTAwMDAwMFowLTErMCkGA1UEAxMiYWNjb3VudHMuYWNjZXNzY29udHJvbC53aW5kb3dzLm5ldDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKdx4TELKpoEo3og7GdWsvlABYBTHQWIBhpBmti9HsOv6t29sfQnHa7v2pladR11dhVcG6StB2LE0kb1iIgkUU/gIDEiJWqe6pYPPomL3RSCbKK3/OPrETfSKtxdaSg/lvb6rIrXBG85Yxwi0ktr1Ckm+4rcI3PwCo5Mt3F+Z3TLqUBEmTU24sGpzPXQCeyvO6VEVzeupUv6vbu8MVr43N4ixKduT1P9OpqBgzHuQVrg+kW/6XRTNaZZthTlITG8VEa8I02S2Q4VyosdzcrMQmRp75MTA2YKdqTexTKmWKaXFIcGCbvMEm35sIfIVziQ8YMSEC+7GBoh3k2g2BFRgtECAwEAAaMhMB8wHQYDVR0OBBYEFGpho/kx4FeBzTTBIbYVWfFdGIblMA0GCSqGSIb3DQEBCwUAA4IBAQBgaeYvuV4sYJZNPXbxN6FIc0oA4bCg1+DFalT3qzW0bFbl7pXP5YPY/adZlT8+cTznjMgzPPvcXaQdcytR16YqHJVX0ik67NrrQ3g0TtGLc42SuzE+6awryiLQY0Zd799bJwrRcDZUqm/6jKOEOd+utf+3o+VU57w+n7iQLuSL1mKYGMsyzMYCj6xVtYl75iam86leT0/tlXHJ8oqxU5w3xVY6P7v0Sz2UteQNQvhKi6R1/cjfiJUp+OzHpaEor6ls7HSvojY2zm1DIaH6EBp2L9TBFt8IALAEN5hX6XYpKmCHRUlzYwoWo7YwzKiot0XdbDW+zPKGPKtIlbg6cw/+';
  //   var publicKey = '-----BEGIN CERTIFICATE-----\n' + x5cString + '\n-----END CERTIFICATE-----';
  //   var verifyOptions = {
  //     // algorithms: ['RS256'],
  //     // audience: '<Your audience (aud) GUID>',
  //     // issuer: '<Your issuer (iss) value>'
  //   };

  //   // Verify
  //   var verifiedToken = jwt.verify(token, publicKey) //, verifyOptions);
  //   console.log(verifiedToken); ˇ
  // }

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
    let adminAddCourse;
    var adminS = this.state.admin;
    // this.getJwksUrl()
    // this.getSigningKey()
    // this.getIdToken()
    if (this.state.admin) {
      adminComponent = <h1>HELLO ADMIN</h1>;
      adminAddCourse = <Route path="/admin" component={Admin} />;
    }
    return (
      <>
        <AzureAD provider={authProvider} forceLogin={true}>
          <Router>
            <Navbar />
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/courses" render={() => <Courses adminStatus={adminS} />} />
              {adminAddCourse}
            </div>
            {adminComponent}
            <Footer />
          </Router>
        </AzureAD>
      </>

    );
  }
}

export default App;
