const config = require("../config");
config.database = "AGILEUNITEST";
const dataAccessor = require("../data/dataAccessor"),
  testerHelpers = require("./testerHelpers"),
  firstRow = 0,
  thirdRow = 2;
let firstRowCourseId;
let addedCourseRowId;

beforeAll(async () => {
  firstRowCourseId = await testerHelpers.resetCoursesTable();
});

afterAll(() => {
  dataAccessor.endConnection();
  testerHelpers.endConnection();
});

describe("When using the dataAccessor to access the courses table", () => {
  describe("Using the all() function", () => {
    it("Should return all courses", async () => {
      const responseObject = await dataAccessor.courses.all();
      expect(responseObject.data.length).toBe(3);
    });
  });

  describe("Using the allWithSites() function", () => {
    it("Should return all courses with their site, from the sites table, attached", async () => {
      const responseObject = await dataAccessor.courses.allWithSites();
      expect(responseObject.data[firstRow].name).toBe("Osterley");
      expect(responseObject.data[thirdRow].name).toBe("Leeds");
    });
  });

  describe("Using the find() function", () => {
    it("Should be able to find a course by id", async () => {
      const responseObject = await dataAccessor.courses.find({
        course_id: firstRowCourseId
      });
      expect(responseObject.data).toBeTruthy();
    });

    it("Should be able to find courses by a fragment of their name", async () => {
      const responseObject = await dataAccessor.courses.find({
        courseTitleFragment: "ES"
      });
      expect(responseObject.data.length).toBe(2);
    });

    it("Should be able to find courses by their site_id", async () => {
      const responseObject = await dataAccessor.courses.find({
        site_id: 1
      });
      expect(responseObject.data.length).toBe(2);
      expect(responseObject.data[firstRow].site_id).toBe(1);
    });

    it("Should be able to find courses by their site_id and name fragment", async () => {
      const responseObject = await dataAccessor.courses.find({
        courseTitleFragment: "ES",
        site_id: 1
      });
      expect(responseObject.data.length).toBe(1);
    });
  });

  describe("Using the add() function", () => {
    const newCourse = {
      title: "NEW COURSE",
      description: "NEW COURSE DESCRIPTION",
      start_date: new Date(),
      location: "TESTING AREA",
      site_id: 3
    };

    it("Should be able to add a course using any of the column names", async () => {
      const responseObject = await dataAccessor.courses.add(newCourse);
      addedCourseRowId = responseObject.data.insertId;
      expect(responseObject.data.affectedRows).toBe(1);
    });
  });

  describe("Using the update() function", () => {
    it("Should update a row when passing an object with the column names and new values", async () => {
      const responseObject = await dataAccessor.courses.update({
        course_id: addedCourseRowId,
        description: "UPDATED DESCRIPTION"
      });
      const updatedRow = await testerHelpers.findById(addedCourseRowId);
      expect(responseObject.data.affectedRows).toBe(1);
      expect(updatedRow.description).toBe("UPDATED DESCRIPTION");
    });
  });

  describe("Using the delete() function", () => {
    it("Should delete a row when passing a row id", async () => {
      const responseObject = await dataAccessor.courses.delete(
        addedCourseRowId
      );
      const updatedRow = await testerHelpers.findById(addedCourseRowId);
      expect(responseObject.data.affectedRows).toBe(1);
      expect(updatedRow).toBeFalsy();
    });

    it("Should delete all rows when passing 'all'", async () => {
      await dataAccessor.courses.delete("all");
      const allRows = await testerHelpers.getAll();
      expect(allRows.length).toBe(0);
    });
  });
});
