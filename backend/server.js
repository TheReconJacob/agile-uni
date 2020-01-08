const mysql = require("mysql"),
  express = require("express"),
  app = express(),
  port = 5000,
  config = require("./config"),
  jwt = require("express-jwt"),
  jwksRsa = require("jwks-rsa"),
  multer = require("multer"),
  upload = multer(),
  cors = require("cors"),
  dataAccessor = require("./data/dataAccessor.js");
// nodemailer = require("nodemailer"),
// creds = require("./emailConfig");

// let transport = {
//   host: "smtp.gmail.com", // e.g. smtp.gmail.com
//   auth: creds
// };

// let transporter = nodemailer.createTransport(transport);

// transporter.verify(error => {
//   if (error) {
//     console.log(error);
//   }
// });

const connection = mysql.createConnection(config);
connection.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("db connection successful");
    app.emit("app_started");
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  jwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://login.microsoftonline.com/common/discovery/v2.0/keys`
    }),

    // Validate the audience and the issuer.
    audience: "c0fb79ba-b72c-47c1-912c-48ee6cbac972",
    issuer:
      "https://login.microsoftonline.com/68b865d5-cf18-4b2b-82a4-a4eddb9c5237/v2.0",
    algorithms: ["RS256"]
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/sites", (req, res, next) => {
  dataAccessor.sites
    .all()
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/search", (req, res) => {
  const parameters = req.query;
  let SQLPromise;

  if (parameters.courseTitleFragment || parameters.site_id) {
    SQLPromise = dataAccessor.courses.find(parameters);
  } else {
    SQLPromise = dataAccessor.courses.all();
  }

  SQLPromise.then(response => {
    res.status = response.status;
    return res.json(response.data);
  }).catch(response => {
    res.status = response.status;
    console.error(response.error);
    return res.json(response.error);
  });
});

app.post("/addCourse", (req, res) => {
  const { start_time, end_time, ...parameters } = req.body;
  parameters.start_date += ` ${start_time}`;
  parameters.end_date += ` ${end_time}`;

  dataAccessor.courses
    .add(parameters)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.post("/editCourse", (req, res) => {
  const { start_time, end_time, ...parameters } = req.body;
  parameters.start_date += ` ${start_time}`;
  parameters.end_date += ` ${end_time}`;

  dataAccessor.courses
    .update(parameters)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/deleteCourse", (req, res) => {
  const { courseId } = req.query;
  dataAccessor.courses
    .delete(courseId)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/addAttendee", (req, res) => {
  const parameters = req.query;
  dataAccessor.attendees
    .add(parameters)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/deleteAttendee", (req, res) => {
  const parameters = req.query;
  dataAccessor.attendees
    .delete(parameters)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/attendees", (req, res) => {
  const { course_id } = req.query;
  dataAccessor.attendees
    .allForCourse(course_id)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/totalAttendees", (req, res) => {
  const { course_id } = req.query;
  dataAccessor.attendees
    .allForCourse(course_id)
    .then(response => {
      res.status = response.status;
      return res.json(response.data.length);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/returnIfBooked", (req, res) => {
  const parameters = req.query;
  dataAccessor.attendees
    .findForCourse(parameters)
    .then(response => {
      res.status = response.status;
      if (response.data.length > 0) {
        return res.json(true);
      } else {
        return res.json(false);
      }
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

app.get("/findCourseById", (req, res) => {
  const parameters = req.query;
  dataAccessor.courses
    .find(parameters)
    .then(response => {
      res.status = response.status;
      return res.json(response.data);
    })
    .catch(response => {
      res.status = response.status;
      console.error(response.error);
      return res.json(response.error);
    });
});

// app.get("/send", (req, res) => {
//   const name = req.query.name;
//   const email = req.query.email;
//   const message = "hello" + name;

//   let mail = {
//     from: "agileuni",
//     to: email,
//     subject: "Booking",

//     html: message
//   };

// transporter.sendMail(mail, (err, data) => {
//   if (err) {
//     res.json({
//       msg: "fail"
//     });
//   } else {
//     res.json({
//       msg: "success"
//     });
//   }
// });
// });

const server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});

// Note to JS learners, put module.exports before any module.exports.banana because it overwrites stuff...
module.exports = app;
module.exports.closeServer = function() {
  server.close();
};
