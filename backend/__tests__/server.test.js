const config = require("../config");
config.database = "AGILEUNITEST";
const supertest = require("supertest");
const server = require("../server.js");
const testerHelpers = require("./testerHelpers");
let request;

beforeAll(async () => {
  await server.serverStart;
  request = supertest(server);
  await testerHelpers.resetCoursesTable();
});

afterAll(() => {
  // closeServer();
  testerHelpers.endConnection();
});

function getRequest(url, queryObject = {}) {
  return request
    .get(url)
    .set("Authorization", `bearer ${process.env.AUTHTOKEN}`)
    .query(queryObject);
}

function postRequest(url, queryObject = {}) {
  return request
    .post(url)
    .set("Authorization", `bearer ${process.env.AUTHTOKEN}`)
    .send(queryObject);
}

// function closeServer() {
//   request.get("/").end();
// }

// - get / (on its ones)
// - get /sites
// - get /search and /search with parameters of courseTitleFragment and site_id where the fragment is a part of the course name and the id is 1, 2 or 3
// - post /addCourse with parameters of title, description, start_date, end_date, attendees_max, location, site_id and instructor_name
// - post /editCourse with same params as above
// - get /deleteCourse with param of course_id
// - get /addAttendee with params course_id and azure_oid (which is just an employee id from microsoft azure so make it a random number)
// - get /deleteAttendee with params course_id and attendee_id
// - get /attendees with param course_id
// - get /totalAttendees with param course_id
// - get /returnIfBooked with params course_id and employee_id
// - get /findCourseById with param course_id

describe("When testing the server.js it", () => {
  it("Should connect successfully and be able to return a response", async () => {
    const response = await getRequest("/");

    expect(response.text).toBe("Hello World");
  });

  describe("Should get all courses when getting from /search", () => {
    it("when no params are given", async () => {
      const response = await getRequest("/search");

      expect(response.body).toHaveLength(3);
    });

    it("when site_id param is 1", async () => {
      const response = await getRequest("/search", { site_id: 1 });

      expect(response.body).toHaveLength(2);
    });

    it("when courseTitleFragment is 'ES'", async () => {
      const response = await getRequest("/search", {
        courseTitleFragment: "ES"
      });

      expect(response.body).toHaveLength(2);
    });

    it("when both params are given", async () => {
      const response = await getRequest("/search", {
        site_id: 1,
        courseTitleFragment: "ES"
      });

      expect(response.body).toHaveLength(1);
    });
  });

  const courseObject = {
    title: "testingAddCourse",
    start_date: "1926-04-21",
    start_time: "09:00",
    end_date: "1926-04-21",
    end_time: "17:00",
    attendees_max: 16,
    description: "Test Description",
    instructor_name: "Queen Elizabeth",
    site_id: 1,
    location: "Buckingham Palace"
  };

  it("Should add a course when posting to /addCourse", async () => {
    const response = await postRequest("/addCourse", courseObject);
    const insertedRow = await testerHelpers.findById(response.body.insertId);
    courseObject.course_id = response.body.insertId;

    expect(insertedRow).toBeTruthy();
  });

  it("Should update a course when posting to /editCourse", async () => {
    courseObject.title = "testingEditCourse";
    courseObject.description = "Changed Description";
    const response = await postRequest("/editCourse", courseObject);
    const insertedRow = await testerHelpers.findById(courseObject.course_id);
  });

  it("Should delete a course when getting from /deleteCourse with param course_id", async () => {
    const response = await getRequest("", {});
  });

  it("Should add an attendee when getting from /addAttendee with params course_id and azure_oid", async () => {
    const response = await getRequest("", {});
  });

  it("Should delete an attendee when getting from /deleteAttendee with params course_id and azure_oid", async () => {
    const response = await getRequest("", {});
  });

  it("Should get all attendees for course when getting from /attendees with param course_id", async () => {
    const response = await getRequest("", {});
  });

  it("Should get number of attendees for course when getting from /totalAttendees with param course_id", async () => {
    const response = await getRequest("", {});
  });

  describe("When getting from /returnIfBooked with params azure_oid and course_id it", () => {
    it("Should return false if the attendee is not booked", async () => {
      const response = await getRequest("", {});
    });

    it("Should return true if the attendee is booked", async () => {
      const response = await getRequest("", {});
    });
  });

  it("Should get the correct course when getting from /findCourseById with para course_id", async () => {
    const response = await getRequest("/findCourseById", {});
  });
});
