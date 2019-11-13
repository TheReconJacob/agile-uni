const allCourses = require('./test-data/all-courses')
const allEmployees = require('./test-data/all-employees')
const allSites = require('./test-data/all-sites')

const Data = {};

Data.getAllCourses = (callback) => {
    callback(null, { status: 200, responseJson: allCourses})
}

Data.getAllEmployees = (callback) => {
    callback(null, { status: 200, responseJson: allEmployees})
}

Data.getAllSites = (callback) => {
    callback(null, { status: 200, responseJson: allSites})
}

Data.searchCoursesNoLocation = (searchTerm, callback) => {

}

Data.searchCoursesWithLocation = (searchTerm, location, callback) => {
	
}

module.exports = Data;