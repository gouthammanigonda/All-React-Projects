const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcrypt");

describe(":::NJSCPFVWOF_TEST_SUITE_1:::Tests for Operations on User Data database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../userData.db");
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

  it(":::NJSCPFVWOF_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPFVWOF_TEST_2:::The POST request with path '/register' should return 'User already exists' as a response if the username already exists", (done) => {
    appInstance
      .post("/register")
      .set("Accept", "application/json")
      .send({
        username: "alger_abbott",
        name: "Alger Abbott",
        password: "abbot_567",
        gender: "male",
        location: "Detroit",
      })
      .expect(400)
      .expect("User already exists")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPFVWOF_TEST_3:::A user should not be created if the username already exists in database", async () => {
    expect(
      await database.get(`SELECT * FROM user WHERE username='alger_abbott'`)
    ).toEqual({
      username: "alger_abbott",
      name: "Alger Abbott",
      password: "$2b$10$Lix9HkG8xGR7AeDNho2pU.08ohfvCOzgLzsOieUjnKDXMGG4ayHOe",
      gender: "male",
      location: "Detroit",
    });
  });

  it(":::NJSCPFVWOF_TEST_4:::The POST request with path '/register' should return 'Password is too short' as a response if the registrant provides a password with less than 5 characters", (done) => {
    appInstance
      .post("/register")
      .set("Accept", "application/json")
      .send({
        username: "kara_welch",
        name: "Kara Welch",
        password: "kar",
        gender: "female",
        location: "Atlanta",
      })
      .expect(400)
      .expect("Password is too short")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_5:::The POST request with path '/register' should return 'User created successfully' text as a response for a successful registration", (done) => {
    appInstance
      .post("/register")
      .set("Accept", "application/json")
      .send({
        username: "kara_welch",
        name: "Kara Welch",
        password: "kara@123",
        gender: "female",
        location: "Atlanta",
      })
      .expect(200)
      .expect("User created successfully")
      .then((error, response) => {
        done();
      });
  });
  
  it(":::NJSCPFVWOF_TEST_6:::The password should be encrypted before creating a user in the database", async () => {
    const databasePassword = await database.get(
      `SELECT password FROM user WHERE username='kara_welch'`
    );
    expect(await bcrypt.compare("kara@123", databasePassword.password)).toBe(
      true
    );
  });

  it(":::NJSCPFVWOF_TEST_7:::The user should be created in the database upon the success of the request with path '/register'", async () => {
    expect(
      await database.get(
        `SELECT username, name, gender, location FROM user WHERE username='kara_welch'`
      )
    ).toEqual({
      username: "kara_welch",
      name: "Kara Welch",
      gender: "female",
      location: "Atlanta",
    });
  });

  it(":::NJSCPFVWOF_TEST_8:::The POST request with path '/login' should return 'Invalid user' text as a response for an unregistered user", (done) => {
    appInstance
      .post("/login")
      .set("Accept", "application/json")
      .send({
        username: "wilda",
        password: "anderson2000",
      })
      .expect(400)
      .expect("Invalid user")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_9:::The POST request with path '/login' should return 'Invalid password' text as a response if the user provides an incorrect password", (done) => {
    appInstance
      .post("/login")
      .set("Accept", "application/json")
      .send({
        username: "wildaAnderson",
        password: "kara@44",
      })
      .expect(400)
      .expect("Invalid password")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_10:::The POST request with path '/login' should return 'Login success!' text as a response if the user provides correct credentials", (done) => {
    appInstance
      .post("/login")
      .set("Accept", "application/json")
      .send({
        username: "wildaAnderson",
        password: "anderson2000",
      })
      .expect(200)
      .expect("Login success!")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_11:::The PUT request with path '/change-password' should return 'Invalid current password' text as a response if the user provides an incorrect current password", (done) => {
    appInstance
      .put("/change-password")
      .set("Accept", "application/json")
      .send({
        username: "cassandraporter",
        oldPassword: "kara@12",
        newPassword: "kara@456",
      })
      .expect(400)
      .expect("Invalid current password")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_12:::The PUT request with path '/change-password' should return 'Password is too short' text as a response if the user provides a new password with less than 5 characters", (done) => {
    appInstance
      .put("/change-password")
      .set("Accept", "application/json")
      .send({
        username: "cassandraporter",
        oldPassword: "123porter",
        newPassword: "456",
      })
      .expect(400)
      .expect("Password is too short")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_13:::The PUT request with path '/change-password' should return 'Password updated' text as a response for a successful password update", (done) => {
    appInstance
      .put("/change-password")
      .set("Accept", "application/json")
      .send({
        username: "cassandraporter",
        oldPassword: "123porter",
        newPassword: "kara@456",
      })
      .expect(200)
      .expect("Password updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPFVWOF_TEST_14:::The new password should be encrypted and added to the database", async () => {
    const databasePassword = await database.get(
      `SELECT password FROM user WHERE username='cassandraporter'`
    );
    expect(await bcrypt.compare("kara@456", databasePassword.password)).toBe(
      true
    );
  });
});
