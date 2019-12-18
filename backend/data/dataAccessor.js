const mysql = require("mysql");
const config = require("../config");
const connection = mysql.createConnection(config.mysqlConfig);
const dataAccessor = {};

function sendQueryAndReturnResultsAsPromise(query, inputs) {
  return new Promise(resolve => {
    connection.query(query, inputs, (error, data) => {
      if (error) {
        resolve({ error, status: 500, data: false });
      } else {
        resolve({ error: false, status: 200, data });
      }
    });
  });
}

dataAccessor.courses = {
  all: () => {
    const query = "SELECT * FROM courses";

    return sendQueryAndReturnResultsAsPromise(query);
  },

  allWithSites: () => {
    const query =
      "SELECT * FROM courses JOIN sites ON courses.site_id = sites.id";

    return sendQueryAndReturnResultsAsPromise(query);
  },

  find: ({ courseId, courseTitleFragment, siteId }) => {
    if (courseId) {
      const query = "SELECT * FROM courses WHERE course_id = ?";
      return sendQueryAndReturnResultsAsPromise(query, [courseId]);
    }

    const inputs = [];
    let whereFilter = " WHERE ";
    let query =
      "SELECT * FROM courses JOIN sites ON courses.site_id = sites.id";

    if (courseTitleFragment) {
      inputs.push(courseTitleFragment);
      whereFilter += "courses.title LIKE %?%";
    }
    if (siteId) {
      inputs.push(siteId);
      if (courseTitleFragment) whereFilter += " AND ";
      whereFilter += "sites.id = ?";
    }

    query += whereFilter;
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  add: ({
    title,
    description,
    start_date,
    end_date,
    attendees_max,
    attendees_booked = 0,
    location,
    site_id,
    instructorName
  }) => {
    const inputs = [
      title,
      description,
      start_date,
      end_date,
      attendees_max,
      attendees_booked,
      location,
      site_id,
      instructorName
    ];
    const query =
      "INSERT INTO courses(title, description, start_date, end_date, attendees_max, attendees_booked, location, site_id, instructor_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  update: newValuesObject => {
    if (!newValuesObject.course_id) {
      return new Promise(resolve => {
        resolve({
          error: "No value for key course_id was found",
          status: 404,
          data: false
        });
      });
    }

    const { course_id } = newValuesObject;
    delete newValuesObject.course_id;
    let query = "UPDATE courses SET ";
    const filter = [],
      inputs = [];

    Object.entries(newValuesObject).forEach(([columnName, newValue]) => {
      filter.push(`${columnName} = ?`);
      inputs.push(newValue);
    });

    inputs.push(course_id);
    query += filter.join(", ") + "WHERE course_id = ?";
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  delete: course_id => {
    const query = "DELETE FROM courses WHERE course_id = ?";

    if (!course_id) {
      return new Promise(resolve => {
        resolve({
          error: "No value for key course_id was found",
          status: 404,
          data: false
        });
      });
    } else {
      return sendQueryAndReturnResultsAsPromise(query, [course_id]);
    }
  }
};

module.exports = dataAccessor;
