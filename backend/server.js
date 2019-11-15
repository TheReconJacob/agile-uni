const mysql = require('mysql')
	  fs = require('fs'),
	  express = require('express'),
	  app = express(),
	  port = 5000,
	  config = require('./data/_config');
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const Data = require("./data/data_access.js");
const dataHandler = require("./data/dataHandler.js");

const connection = mysql.createConnection(config.mysqlConfig);

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("db connection successful");
    app.emit("app_started");
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://login.microsoftonline.com/common/discovery/v2.0/keys`
    }),

    // Validate the audience and the issuer.
    audience: "c0fb79ba-b72c-47c1-912c-48ee6cbac972",
    issuer:
      "https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237/v2.0",
    algorithms: ["RS256"]
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/employees", (req, res) => {
  dataHandler.getEmployees(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/courses", (req, res) => {
  dataHandler.getCourses(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/sites", (req, res) => {
  dataHandler.getSites(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/search", (req, res) => {
  dataHandler.searchCourses(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});

// Note to JS learners, put module.exports before any module.exports.banana because it overwrites stuff...
module.exports = app;
module.exports.SimpleMessage = "Hello world";
module.exports.closeServer = function() {
  server.close();
};


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(jwt({
	// Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
	secret: jwksRsa.expressJwtSecret({
	  cache: true,
	  rateLimit: true,
	  jwksRequestsPerMinute: 5,
	  jwksUri: `https://login.microsoftonline.com/common/discovery/v2.0/keys`
	}),
  
	// Validate the audience and the issuer.
	audience: 'c0fb79ba-b72c-47c1-912c-48ee6cbac972',
	issuer: 'https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237/v2.0',
	algorithms: [ 'RS256' ]
  }));
