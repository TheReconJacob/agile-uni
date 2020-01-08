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

  update: ({ course_id, ...newValuesObject }) => {
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

dataAccessor.sites = {
  all: () => {
    const query = "SELECT * FROM sites";

    return sendQueryAndReturnResultsAsPromise(query);
  },

  findById: site_id => {
    const query = "SELECT * FROM sites WHERE id = ?";

    return sendQueryAndReturnResultsAsPromise(query, [site_id], true);
  },

  add: ({ id, name, address }) => {
    // prettier-ignore
    const query = `INSERT INTO sites (name, address${ id ? ", id" : "" }) VALUES (?, ?${ id ? ", ?" : "" })`;
    const inputs = [name, address];

    if (id) inputs.push(id);
    return sendQueryAndReturnResultsAsPromise(query, inputs);
  }
};

dataAccessor.attendees = {
  allForCourse: course_id => {
    const query =
      "SELECT * FROM course_attendees JOIN courses ON course_attendees.course_id = courses.id WHERE courses.id = ?";

    return sendQueryAndReturnResultsAsPromise(query, [course_id]);
  },

  findForCourse: ({ employee_id, course_id }) => {
    const inputs = [employee_id, course_id];
    const query =
      "SELECT * FROM course_attendees WHERE azure_oid = ? AND course_id = ?";

    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  add: ({ course_id, azure_oid }) => {
    const query =
      "INSERT INTO course_attendees (course_id, azure_oid, attended) VALUES (?, ?, ?)";
    const inputs = [course_id, azure_oid, false];

    return sendQueryAndReturnResultsAsPromise(query, inputs);
  },

  delete: ({ attendee_id, course_id }) => {
    const query =
      "DELETE FROM course_attendees WHERE course_id = ? AND azure_oid = ?";

    return sendQueryAndReturnResultsAsPromise(query, [course_id, attendee_id]);
  }
};

module.exports = dataAccessor;
