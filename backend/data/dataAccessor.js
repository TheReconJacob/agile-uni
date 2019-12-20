const mysql = require("mysql"),
  config = require("../config"),
  connection = mysql.createConnection(config),
  dataAccessor = {},
  withCommas = ", ";

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
        if (shouldReturnSingleValue && data.length > 0) data = data[0];
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
      "SELECT courses.*, sites.name, sites.address FROM courses JOIN sites ON courses.site_id = sites.id";

    return sendQueryAndReturnResultsAsPromise(query);
  },

  find: ({ course_id, courseTitleFragment, site_id }) => {
    if (course_id) {
      const query = "SELECT * FROM courses WHERE id = ?";
      return sendQueryAndReturnResultsAsPromise(query, [course_id], true);
    }

    const inputs = [];
    let whereFilter = " WHERE ",
      query =
        "SELECT courses.*, sites.name, sites.address FROM courses JOIN sites ON courses.site_id = sites.id";

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
      columnNames = [],
      questionMarks = [];

    Object.entries(newCourseObject).forEach(([columnName, value]) => {
      columnNames.push(columnName);
      inputs.push(value);
      questionMarks.push("?");
    });
    // prettier-ignore
    const query = `INSERT INTO courses(${columnNames.join(withCommas)}) VALUES (${questionMarks.join(withCommas)})`;
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
    // prettier-ignore
    const query = `UPDATE courses SET ${filter.join(withCommas)} WHERE id = ?`;
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  delete: course_id => {
    let query = "DELETE FROM courses";
    if (course_id === "all") return sendQueryAndReturnResultsAsPromise(query);

    query += " WHERE id = ?";
    return sendQueryAndReturnResultsAsPromise(query, [course_id]);
  }
};

module.exports = dataAccessor;
