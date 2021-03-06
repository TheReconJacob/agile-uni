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

describe("When testing the server.js it", () => {
  it("Should connect successfully and be able to return a response", async () => {
    const response = await getRequest("/");

    expect(response.text).toBe("Hello World");
  });

  describe("Should get all courses when getting from /courses", () => {
    it("when no parameters are given", async () => {
      const response = await getRequest("/courses");

      expect(response.body).toHaveLength(3);
    });

    it("when site_id parameter is 1", async () => {
      const response = await getRequest("/courses", { site_id: 1 });

      expect(response.body).toHaveLength(2);
    });

    it("when courseTitleFragment is 'ES'", async () => {
      const response = await getRequest("/courses", {
        courseTitleFragment: "ES"
      });

      expect(response.body).toHaveLength(2);
    });

    it("when both parameters are given", async () => {
      const response = await getRequest("/courses", {
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
    const insertedRow = await testerHelpers.findCourseById(
      response.body.insertId
    );
    courseObject.course_id = response.body.insertId;

    expect(insertedRow.title).toBe("testingAddCourse");
  });

  it("Should update a course when posting to /editCourse", async () => {
    courseObject.title = "testingEditCourse";
    courseObject.description = "Changed Description";
    await postRequest("/editCourse", courseObject);
    const insertedRow = await testerHelpers.findCourseById(
      courseObject.course_id
    );

    expect(insertedRow.title).toBe("testingEditCourse");
    expect(insertedRow.description).toBe("Changed Description");
  });

  it("Should delete a course when getting from /deleteCourse with parameter course_id", async () => {
    const response = await getRequest("/deleteCourse", {
      courseId: courseObject.course_id
    });

    expect(response.body.affectedRows).toBe(1);
  });

  it("Should add an attendee when getting from /addAttendee with parameters course_id and azure_oid", async () => {
    const response = await getRequest("/addAttendee", {
      course_id: 2,
      azure_oid: 100
    });
    expect(response.body.affectedRows).toBe(1);
  });
  it("Should delete an attendee when getting from /deleteAttendee with parameters course_id and azure_oid", async () => {
    const response = await getRequest("/deleteAttendee", {
      course_id: 2,
      azure_oid: 100
    });
    expect(response.body.affectedRows).toBe(1);
  });
  it("Should get all attendees for course when getting from /attendees with parameter course_id", async () => {
    await testerHelpers.addAttendee({});
    const response = await getRequest("/attendees", { course_id: 1 });
    expect(response.body).toHaveLength(1);
  });
  it("Should get number of attendees for course when getting from /totalAttendees with parameter course_id", async () => {
    const response = await getRequest("/totalAttendees", { course_id: 1 });
    expect(response.body).toBe(1);
  });

  describe("When getting from /returnIfBooked with parameters azure_oid and course_id it", () => {
    it("Should return false if the attendee is not booked", async () => {
      const response = await getRequest("/returnIfBooked", {
        azure_oid: 999999,
        course_id: 1
      });

      expect(response.body).toBe(false);
    });
    it("Should return true if the attendee is booked", async () => {
      const response = await getRequest("/returnIfBooked", {
        azure_oid: 1,
        course_id: 1
      });

      expect(response.body).toBe(true);
    });
  });

  it("Should get the correct course when getting from /findCourseById with parametereter course_id", async () => {
    const response = await getRequest("/findCourseById", { course_id: 1 });
    expect(response.body.title).toBe("TEST");
  });

  it("Should return a json file when getting from /getCourseAsJson with parametereter course_id", async () => {
    const response = await getRequest("/getCourseAsJson", { course_id: 1 });

    const expectedKey = {
      title: {
        type: "text",
        label: "Title",
        required: false,
        default: "TEST"
      }
    };

    const expectedEmbeddedKey = {
      date: {
        label: "Start Date",
        width: "75%",
        type: "date",
        required: false,
        default: "2020-06-23"
      }
    };

    expect(response.body.json.start.contents).toMatchObject(
      expectedEmbeddedKey
    );
    expect(response.body.json).toMatchObject(expectedKey);
  });
});
