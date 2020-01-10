const mysql = require("mysql"),
  express = require("express"),
  app = express(),
  port = 5000,
  config = require("./config"),
  jwt = require("express-jwt"),
  jwksRsa = require("jwks-rsa"),
  multer = require("multer"),
  upload = multer(),
  nodemailer = require("nodemailer"),
  creds = require("./emailConfig"),
  path = require("path");
app.use(express.json());

let transport = {
  host: "smtp.gmail.com", // e.g. smtp.gmail.com
  auth: creds
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  }
});

let cors = require("cors");

const Data = require("./data/data_access.js");
const dataHandler = require("./data/dataHandler.js");

const connection = mysql.createConnection(config);

app.use(express.urlencoded({ extended: true }));
app.use(upload.array());
app.use(express.static("public"));
app.use(cors());

connection.connect(function(err) {
  if (err) {
    throw err;
  } else {
    console.log("db connection successful");
    app.emit("app_started");
  }
});

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

app.get("/employees", (req, res) => {
  dataHandler.getEmployees(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/courses", (req, res) => {
  dataHandler.getCourses(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/sites", (req, res) => {
  dataHandler.getSites(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/search", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.searchCourses(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/listAllCourses", (req, res) => {
  dataHandler.listAllCourses(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.post("/addCourse", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.addCourse(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);

    return res.json(result.responseJson);
  });
});

app.post("/editCourse", (req, res) => {
  dataHandler.editCourse(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/deleteCourse", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.deleteCourse(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  }
  console.log("Listening on port " + port);
});

app.post("/addEmployee", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.addEmployee(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/addAttendee", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.addAttendee(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
      
    }
    res.status(result.status);
    const {
      name,
      email
    } = result.responseJson.combinedResponse[0].employees.responseJson[0];
    const {
      title,
      start_date,
      end_date,
      location
    } = result.responseJson.combinedResponse[0].course_content.responseJson[0];

    const startDateMessage = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.parse(start_date));

    const endDateMessage = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.parse(end_date));

    const message =
      "<p> Hello " +
      name +
      " <br> </p> <p> Confirmation of your booking onto " +
      title +
      " on " +
      startDateMessage +
      " until " +
      endDateMessage +
      ". This course will take place in " +
      location +
      "<br>" +
      "<p> If you are unable to attend, please make sure that you cancel your booking. <br><br> Many thanks <br><br> Agile University Team <p>";

    let mail = {
      from: "agileuni",
      to: email,
      subject: "Booking confirmation " + title,

      html: message
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: "fail"
        });
      } else {
        res.json({
          msg: "success"
        });
      }
    });
    return res.json(result.responseJson);
  });
});

app.get("/deleteAttendee", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.deleteAttendee(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    const {
      name,
      email
    } = result.responseJson.combinedResponse[0].employees.responseJson[0];
    const {
      title,
      start_date,
      end_date
    } = result.responseJson.combinedResponse[0].course_content.responseJson[0];

    const startDateMessage = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.parse(start_date));

    const endDateMessage = new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(Date.parse(end_date));

    const message =
      "<p> Hello " +
      name +
      " <br> </p> <p> This email confirms the cancellation of your place on " +
      title +
      " on " +
      startDateMessage +
      " until " +
      endDateMessage +
      "<br>" +
      "Many thanks <br><br> Agile University Team <p>";

    let mail = {
      from: "agileuni",
      to: email,
      subject: "Booking cancellation " + title,

      html: message
    };

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: "fail"
        });
      } else {
        res.json({
          msg: "success"
        });
      }
    });
    return res.json(result.responseJson);
  });
});

app.get("/returnIfBooked", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  dataHandler.returnIfBooked(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/findCourseById", (req, res) => {
  dataHandler.findCourseById(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/findEmployeeById", (req, res) => {
  dataHandler.findEmployeeById(Data)(req, (err, result) => {
    if (err) {
      res.status(500);
      return res.json({ message: err.message });
    }
    res.status(result.status);
    return res.json(result.responseJson);
  });
});

app.get("/send", (req, res) => {
  req.header("Access-Control-Allow-Origin");
  const name = req.query.name;
  const email = req.query.email;
  const message = "hello" + name;

  let mail = {
    from: "agileuni",
    to: email,
    subject: "Booking",

    html: message
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });
});

app.get("/retrieveRandomAnimal", (req, res) => {
  const randomNumber = Math.floor(Math.random() * 7) + 1;
  res.sendFile(path.resolve(`${__dirname}/../src/images/${randomNumber}.jpg`));
})

module.exports = app;
module.exports.closeServer = function() {
  server.close();
};
