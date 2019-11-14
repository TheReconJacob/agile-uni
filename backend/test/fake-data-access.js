const allCourses = require('./fake-data/all-courses')
const allEmployees = require('./fake-data/all-employees')
const allSites = require('./fake-data/all-sites')

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

Data.listAllCourses = (callback) => {
    callback(null, { status: 200, responseJson: allCourses})
}

module.exports = Data;