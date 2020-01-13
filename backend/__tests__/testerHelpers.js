const config = require("../config"),
  mysql = require("mysql"),
  connection = mysql.createConnection(config),
  addCourseQuery = `;INSERT INTO courses (id, title, description, start_date, site_id, location) VALUES (?, ?, ?, ?, ?, ?)`,
  inputs = [];
let query = "DELETE FROM courses";

function createInput({ title = "TEST", site_id = 1, course_id }) {
  const start_date = new Date();

  query += addCourseQuery;
  inputs.push(
    course_id,
    title,
    "THIS IS A TEST",
    start_date,
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
  }
};
