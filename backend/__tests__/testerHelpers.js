const config = require("../config"),
  mysql = require("mysql"),
  connection = mysql.createConnection(config),
  addCourseQuery = `;INSERT INTO courses (id, title, attendees_max, description, start_date, end_date, site_id, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  inputs = [];
let query = "DELETE FROM courses";

function createInput({ title = "TEST", site_id = 1, course_id }) {
  const start_date = "2020-06-23 09:00";
  const end_date = "2020-06-23 17:00";
  const attendees_max = 10;

  query += addCourseQuery;
  inputs.push(
    course_id,
    title,
    attendees_max,
    "THIS IS A TEST",
    start_date,
    end_date,
    site_id,
    "BUILDING"
  );
}

module.exports = {
  endConnection: () => {
    connection.end();
  },

  resetCoursesTable: () => {
    createInput({ course_id: 1 });
    createInput({ title: "TITLE", course_id: 2 });
    createInput({ site_id: 2, course_id: 3 });

    return new Promise(resolve => {
      connection.query(query, inputs, (error, [, firstRow]) => {
        if (error) console.log(error);
        resolve(firstRow.insertId);
      });
    });
  },

  findById: course_id => {
    return new Promise(resolve => {
      connection.query(
        `SELECT * FROM courses WHERE id = ${course_id}`,
        (error, [rowData]) => {
          if (error) console.log(error);
          resolve(rowData);
        }
      );
    });
  },

  getAll: () => {
    return new Promise(resolve => {
      connection.query("SELECT * FROM courses", (error, data) => {
        if (error) console.log(error);
        resolve(data);
      });
    });
  },

  addAttendee: ({ course_id = 1, azure_oid = 1 }) => {
    return new Promise(resolve => {
      connection.query(
        "INSERT INTO course_attendees (course_id, azure_oid, attended) VALUES (?, ?, ?)",
        [course_id, azure_oid, false]
      );
    });
  }
};
