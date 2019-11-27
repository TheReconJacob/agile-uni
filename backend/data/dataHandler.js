// ----- getCoursesHandler.js
// This is the request handler.
// We pass Users as a parameter, but do not require it.
module.exports.getCourses = DataAccess => (req, callback) => {
  // Here, we call the data access layer.
  DataAccess.getAllCourses((err, courses) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { courses: courses } });
  });
};

module.exports.getEmployees = DataAccess => (req, callback) => {
  DataAccess.getAllEmployees((err, employees) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { employees: employees } });
  });
};

module.exports.getSites = DataAccess => (req, callback) => {
  DataAccess.getAllSites((err, sites) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { sites: sites } });
  });
};

module.exports.searchCourses = DataAccess => (req, callback) => {
  if (!req.query.siteId) {
    DataAccess.searchCoursesNoSite(req.query.searchTerm, (err, courses) => {
      if (err) {
        return callback(err);
      }
      callback(null, { status: 200, responseJson: { courses: courses } });
    });
  } else {
    DataAccess.searchCoursesWithSite(
      req.query.searchTerm,
      req.query.siteId,
      (err, courses) => {
        if (err) {
          return callback(err);
        }

        callback(null, { status: 200, responseJson: { courses: courses } });
      }
    );
  }
};

module.exports.listAllCourses = DataAccess => (req, callback) => {
  DataAccess.listAllCourses((err, courses) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { courses: courses } });
  });
};

module.exports.editCourse = DataAccess => (req, callback) => {
  const body = req.body;
  body.start_date = body.start_date + " " + body.start_time;
  body.end_date = body.end_date + " " + body.end_time;
  const parameters = [
    body.title,
    body.description,
    body.start_date,
    body.end_date,
    body.attendees_max,
    body.location,
    body.site_id,
    body.instructor_name,
    body.course_id
  ];

  console.log(parameters);

  DataAccess.editCourse(parameters, err => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200 });
  });
};

module.exports.addCourse = DataAccess => (req, callback) => {
  const body = req.body;
  body.start_date = body.start_date + " " + body.start_time;
  body.end_date = body.end_date + " " + body.end_time;
  const parameters = [
    body.title,
    body.description,
    body.start_date,
    body.end_date,
    body.attendees_max,
    body.location,
    body.site_id,
    body.instructor_name
  ];
  DataAccess.addCourse(parameters, (err, courses) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { courses: courses } });
  });
};

module.exports.deleteCourse = DataAccess => (req, callback) => {
  DataAccess.deleteCourse(req.query.courseId, (err, courses) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { courses: courses } });
  });
};

module.exports.addEmployee = DataAccess => (req, callback) => {
  const body = req.body;
  const parameters = [body.name, body.object_id, body.email];
  DataAccess.addEmployee(parameters, (err, employees) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { employees: employees } });
  });
};

module.exports.addAttendee = DataAccess => (req, callback) => {
  DataAccess.addAttendee(
    req.query.courseid,
    req.query.employeeid,
    (err, combinedResponse) => {
      if (err) {
        return callback(err);
      }
      callback(null, {
        status: 200,
        responseJson: { combinedResponse: combinedResponse }
      });
    }
  );
};

module.exports.deleteAttendee = DataAccess => (req, callback) => {
  DataAccess.deleteAttendee(
    req.query.courseid,
    req.query.attendeeid,
    (err, combinedResponse) => {
      if (err) {
        return callback(err);
      }
      callback(null, {
        status: 200,
        responseJson: { combinedResponse: combinedResponse }
      });
    }
  );
};

module.exports.returnIfBooked = DataAccess => (req, callback) => {
  DataAccess.returnIfBooked(
    req.query.course_id,
    req.query.employee_id,
    (err, course_attendees) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      callback(null, {
        status: 200,
        responseJson: { course_attendees: course_attendees }
      });
    }
  );
};

module.exports.findCourseById = DataAccess => (req, callback) => {
  DataAccess.findCourseById(req.query.course_id, (err, courses) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { courses: courses } });
  });
};

module.exports.findEmployeeById = DataAccess => (req, callback) => {
  DataAccess.findEmployeeById(req.query.employee_id, (err, employees) => {
    if (err) {
      return callback(err);
    }
    callback(null, { status: 200, responseJson: { employees: employees } });
  });
};
