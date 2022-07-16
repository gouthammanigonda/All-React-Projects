const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

describe(":::NJSCPRHNKY_TEST_SUITE_1:::Tests for Operations on Todo Application database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../todoApplication.db");
  beforeAll(() => {
    try {
      app = require("../app.js");
      appInstance = request(app);
    } catch (error) {}

    open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
      .then((sqliteDB) => {
        database = sqliteDB;
      })
      .catch((error) => {});
  });

  it(":::NJSCPRHNKY_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPRHNKY_TEST_2:::The GET request with path '/todos/?status=TO%20DO' should return the list of all todos whose status is 'TO DO' as a response", (done) => {
    appInstance
      .get("/todos/?status=TO%20DO")
      .expect(200)
      .expect([
        {
          id: 2,
          todo: "Buy a Car",
          priority: "MEDIUM",
          status: "TO DO",
        },
        {
          id: 3,
          todo: "Clean the garden",
          priority: "LOW",
          status: "TO DO",
        },
        {
          id: 5,
          todo: "Attend a ceremony",
          priority: "LOW",
          status: "TO DO",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_3:::The GET request with path '/todos/?priority=HIGH' should return the list of all todos whose priority is 'HIGH' as a response", (done) => {
    appInstance
      .get("/todos/?priority=HIGH")
      .expect(200)
      .expect([
        {
          id: 1,
          todo: "Learn Node JS",
          priority: "HIGH",
          status: "IN PROGRESS",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_4:::The GET request with path '/todos/?priority=HIGH&status=IN%20PROGRESS' should return the list of all todos whose priority is 'HIGH' and status is 'IN PROGRESS' as a response", (done) => {
    appInstance
      .get("/todos/?priority=HIGH&status=IN%20PROGRESS")
      .expect(200)
      .expect([
        {
          id: 1,
          todo: "Learn Node JS",
          priority: "HIGH",
          status: "IN PROGRESS",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_5:::The GET request with path '/todos/?search_q=Play' should return the list of all todos whose todo contains 'Play' text as a response", (done) => {
    appInstance
      .get("/todos/?search_q=Play")
      .expect(200)
      .expect([
        {
          id: 4,
          todo: "Play video games",
          priority: "MEDIUM",
          status: "DONE",
        },
      ])
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPRHNKY_TEST_6:::The GET request with path '/todos/:todoId/' should return a specific todo based on the todo ID as a response", (done) => {
    appInstance
      .get("/todos/4")
      .expect(200)
      .expect({
        id: 4,
        todo: "Play video games",
        priority: "MEDIUM",
        status: "DONE",
      })
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPRHNKY_TEST_7:::The POST request with path '/todos/' should return the 'Todo Successfully Added' text as a response upon success", (done) => {
    appInstance
      .post("/todos/")
      .set("Accept", "application/json")
      .send({
        id: 6,
        todo: "Watch Movie",
        priority: "MEDIUM",
        status: "TO DO",
      })
      .expect(200)
      .expect("Todo Successfully Added")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPRHNKY_TEST_8:::The database should be updated on the post request", async () => {
    expect(await database.get(`SELECT * FROM todo WHERE id=6`)).toEqual({
      id: 6,
      todo: "Watch Movie",
      priority: "MEDIUM",
      status: "TO DO",
    });
  });
  it(":::NJSCPRHNKY_TEST_9:::The PUT request with path '/todos/:todoId/' with 'status' property in the body should return the 'Status Updated' text as a response upon success", (done) => {
    appInstance
      .put("/todos/6/")
      .set("Accept", "application/json")
      .send({
        status: "IN PROGRESS",
      })
      .expect(200)
      .expect("Status Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_10:::The PUT request with path '/todos/:todoId/' with 'priority' property in the body should return the 'Priority Updated' text as a response upon success", (done) => {
    appInstance
      .put("/todos/6/")
      .set("Accept", "application/json")
      .send({
        priority: "HIGH",
      })
      .expect(200)
      .expect("Priority Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_11:::The PUT request with path '/todos/:todoId/' with 'todo' property in the body should return the 'Todo Updated' text as a response upon success", (done) => {
    appInstance
      .put("/todos/6/")
      .set("Accept", "application/json")
      .send({
        todo: "Priority task",
      })
      .expect(200)
      .expect("Todo Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPRHNKY_TEST_12:::The database should be updated on the put request", async () => {
    expect(await database.get(`SELECT * FROM todo WHERE id=6`)).toEqual({
      id: 6,
      todo: "Priority task",
      priority: "HIGH",
      status: "IN PROGRESS",
    });
  });

  it(":::NJSCPRHNKY_TEST_13:::The DELETE request with path '/todos/:todoId/' should return 'Todo Deleted' text as a response upon success", (done) => {
    appInstance
      .delete("/todos/6/")
      .expect(200)
      .expect("Todo Deleted")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPRHNKY_TEST_14:::The database should be updated on the delete request", async () => {
    expect(await database.get(`SELECT * FROM todo WHERE id=6`)).toEqual(
      undefined
    );
  });
});
