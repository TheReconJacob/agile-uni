const allCourses = require("./fake-data/all-courses");
const allEmployees = require("./fake-data/all-employees");
const allSites = require("./fake-data/all-sites");
const searchNoParam = require("./fake-data/search-no-parameters");
const searchAgileOsterley = require("./fake-data/search-agile-osterley");
const searchOsterley = require("./fake-data/search-osterley");
const searchAgile = require("./fake-data/search-agile");
const deleteExample = require("./fake-data/delete-result.json");

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

Data.searchCoursesNoSite = (searchTerm, callback) => {
  if (searchTerm === "") {
    callback(null, { status: 200, responseJson: searchNoParam });
  }
  if (searchTerm === "agile") {
    callback(null, { status: 200, responseJson: searchAgile });
  }
};

Data.searchCoursesWithSite = (searchTerm, siteId, callback) => {
  if (siteId === "Osterley" && searchTerm === "") {
    callback(null, { status: 200, responseJson: searchOsterley });
  } else if (siteId === "Osterley" && searchTerm === "agile") {
    callback(null, { status: 200, responseJson: searchAgileOsterley });
  }
};

Data.deleteCourse = (courseId, callback) => {
    callback(null, { status: 200, responseJson: deleteExample });
};
module.exports = Data;
