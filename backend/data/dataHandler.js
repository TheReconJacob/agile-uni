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
    
  DataAccess.getAllEmployees((err, employees) => {
    if (err) {
      return callback(err)
    }
    callback(null, { status: 200, responseJson: { employees: employees }})
  })
};

module.exports.getSites = (DataAccess) => (req, callback) => {
    
  DataAccess.getAllSites((err, sites) => {
    if (err) {
      return callback(err)
    }
    callback(null, { status: 200, responseJson: { sites: sites }})
  })
};

module.exports.searchCourses = (DataAccess) => (req, callback) => {
  if(req.query.location === "") {
    DataAccess.searchCoursesNoLocation(req.query.searchTerm, (err, courses) => {
      if (err) {
        return callback(err)
      }
      callback(null, { status: 200, responseJson: { courses: courses }})
    })  
  } else {
    
    DataAccess.searchCoursesWithLocation(req.query.searchTerm, req.query.location, (err, courses) => {
      
      if (err) {
        return callback(err)
      }
      
      callback(null, { status: 200, responseJson: { courses: courses }})
    })
  }

};

module.exports.listAllCourses = (DataAccess) => (req, callback) => {
    
  DataAccess.listAllCourses((err, courses) => {
    if (err) {
      return callback(err)
    }
    callback(null, { status: 200, responseJson: { courses: courses }})
  })
};

module.exports.addCourse = (DataAccess) => (req, callback) => {

  DataAccess.addCourse(req.query.title, req.query.location, req.query.site, req.query.startDate, req.query.endDate, req.query.attendeesMax, req.query.description, (err, courses) => {
    if (err) {
      return callback(err)
    }
    callback(null, {status: 200, responseJson: { courses:courses }})
  })
};

// if(req.query.location === "") {
//   Tasks.searchNoLocation(req.query.searchTerm, function(err, rows){
//     handleResponse(res, err, rows);
//   });
// } else {
//   Tasks.searchWithLocation(req.query.searchTerm, req.query.location, function(err, rows){
//       handleResponse(res, err, rows);
//   });
// }