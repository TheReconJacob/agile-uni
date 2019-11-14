<<<<<<< HEAD
const allCourses = require('./fake-data/all-courses')
const allEmployees = require('./fake-data/all-employees')
const allSites = require('./fake-data/all-sites')
=======
const allCourses = require("./fake-data/all-courses");
const allEmployees = require("./fake-data/all-employees");
const allSites = require("./fake-data/all-sites");
const searchNoParam = require("./fake-data/search-no-parameters");
const searchAgileOsterley = require("./fake-data/search-agile-osterley");
const searchOsterley = require("./fake-data/search-osterley");
const searchAgile = require("./fake-data/search-agile");
>>>>>>> cf198bd7b4ee54bf8ad8af23e13ad98bc6b69096

const Data = {};

Data.getAllCourses = callback => {
  callback(null, { status: 200, responseJson: allCourses });
};

Data.listAllCourses = callback => {
  callback(null, { status: 200, responseJson: searchNoParam });
};

Data.getAllEmployees = callback => {
  callback(null, { status: 200, responseJson: allEmployees });
};

Data.getAllSites = callback => {
  callback(null, { status: 200, responseJson: allSites });
};

Data.searchCoursesNoLocation = (searchTerm, callback) => {
  if (searchTerm === "") {
    callback(null, { status: 200, responseJson: searchNoParam });
  }
  if (searchTerm === "agile") {
    callback(null, { status: 200, responseJson: searchAgile });
  }
};

Data.searchCoursesWithLocation = (searchTerm, location, callback) => {
<<<<<<< HEAD
	
}

Data.listAllCourses = (callback) => {
    callback(null, { status: 200, responseJson: allCourses})
}

module.exports = Data;
=======
  if (location === "Osterley" && searchTerm === "") {
    callback(null, { status: 200, responseJson: searchOsterley });
  } else if (location === "Osterley" && searchTerm === "agile") {
    callback(null, { status: 200, responseJson: searchAgileOsterley });
  }
};

module.exports = Data;
>>>>>>> cf198bd7b4ee54bf8ad8af23e13ad98bc6b69096
