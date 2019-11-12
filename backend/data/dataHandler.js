// ----- getCoursesHandler.js
// This is the request handler.
// We pass Users as a parameter, but do not require it.
module.exports.getCourses = (DataAccess) => (req, callback) => {
    
    // Here, we call the data access layer.
    DataAccess.getAllCourses((err, courses) => {
      if (err) {
        return callback(err)
      }
      callback(null, { status: 200, responseJson: { courses: courses }})
    })
};

module.exports.getEmployees = (DataAccess) => (req, callback) => {
    
  // Here, we call the data access layer.
  DataAccess.getAllEmployees((err, employees) => {
    if (err) {
      return callback(err)
    }
    callback(null, { status: 200, responseJson: { employees: employees }})
  })
};

module.exports.getSites = (DataAccess) => (req, callback) => {
    
  // Here, we call the data access layer.
  DataAccess.getAllSites((err, sites) => {
    if (err) {
      return callback(err)
    }
    callback(null, { status: 200, responseJson: { sites: sites }})
  })
};