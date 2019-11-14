const allCourses = require('./fake-data/all-courses')
const allEmployees = require('./fake-data/all-employees')
const allSites = require('./fake-data/all-sites')
const searchNoParam = require('./fake-data/search-no-parameters')
const searchAgileOsterley = require('./fake-data/search-agile-osterley')
const searchCulture = require('./fake-data/search-culture')

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
    if(searchTerm === "") {
        callback(null, { status: 200, responseJson: searchNoParam})
    }
    if(searchTerm === "culture") {
        callback(null, { status: 200, responseJson: searchCulture})
    }
}

Data.searchCoursesWithLocation = (searchTerm, location, callback) => {
    if(location === "Osterley") {
        callback(null, { status: 200, responseJson: searchAgileOsterley})
    }
    if(location === "Leeds") {
        callback(null, { status: 200, responseJson: searchAgileOsterley})
    }
}

module.exports = Data;