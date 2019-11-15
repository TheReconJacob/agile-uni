const mysql = require('mysql')
	  fs = require('fs'),
	  express = require('express'),
	  app = express(),
	  port = 5000,
	  //searchRoutes = require('./routes/search.js'),
	  config = require('./data/_config');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use('/search', searchRoutes);

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
app.get('/listAllCourses', (req, res) => {
	dataHandler.listAllCourses(Data)(req, (err, result) => {
		if (err) {
		  res.status(500)
		  return res.json({ message: err.message })
		}
		res.status(result.status)
		return res.json(result.responseJson)
	})
})

app.get('/listAllCourses', (req, res) => {
	dataHandler.listAllCourses(Data)(req, (err, result) => {
		if (err) {
		  res.status(500)
		  return res.json({ message: err.message })
		}
		res.status(result.status)
		return res.json(result.responseJson)
	})
})


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

app.get("/delete", (req, res) => {
	dataHandler.deleteCourse(Data)(req, (err, result) => {
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
