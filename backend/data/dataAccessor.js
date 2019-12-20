const mysql = require("mysql"),
  config = require("../config"),
  connection = mysql.createConnection(config),
  dataAccessor = {};

function sendQueryAndReturnResultsAsPromise(
  query,
  inputs,
  shouldReturnSingleValue
) {
  return new Promise((resolve, reject) => {
    connection.query(query, inputs, (error, data) => {
      if (error) {
        reject({ error, data: false, status: 500 });
      } else {
        if (shouldReturnSingleValue) data = data[0];
        resolve({ error: false, data, status: 200 });
      }
    });
  });
}

dataAccessor.endConnection = () => {
  connection.end();
};

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

  find: ({ course_id, courseTitleFragment, site_id }) => {
    if (course_id) {
      const query = "SELECT * FROM courses WHERE course_id = ?";
      return sendQueryAndReturnResultsAsPromise(query, [course_id], true);
    }

    const inputs = [];
    let whereFilter = " WHERE ",
      query = "SELECT * FROM courses JOIN sites ON courses.site_id = sites.id";

    if (courseTitleFragment) {
      inputs.push(`%${courseTitleFragment}%`);
      whereFilter += "courses.title LIKE ?";
    }

    if (site_id) {
      inputs.push(site_id);
      if (courseTitleFragment) whereFilter += " AND ";
      whereFilter += "sites.id = ?";
    }

    query += whereFilter;
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  add: newCourseObject => {
    const inputs = [],
      columns = [],
      questionMarks = [];

    Object.entries(newCourseObject).forEach(([columnName, value]) => {
      columns.push(columnName);
      inputs.push(value);
      questionMarks.push("?");
    });
    const query = `INSERT INTO courses(${columns.join(
      ", "
    )}) VALUES (${questionMarks.join(", ")})`;
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  update: newValuesObject => {
    const { course_id } = newValuesObject;
    delete newValuesObject.course_id;
    const filter = [],
      inputs = [];

    Object.entries(newValuesObject).forEach(([columnName, newValue]) => {
      filter.push(`${columnName} = ?`);
      inputs.push(newValue);
    });

    inputs.push(course_id);
    const query = `UPDATE courses SET ${filter.join(", ")} WHERE course_id = ?`;
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  delete: course_id  => {
    let query = "DELETE FROM courses";
    if (course_id === "all") return sendQueryAndReturnResultsAsPromise(query);

    query += " WHERE course_id = ?";
    return sendQueryAndReturnResultsAsPromise(query, [course_id]);
  }
};

module.exports = dataAccessor;
