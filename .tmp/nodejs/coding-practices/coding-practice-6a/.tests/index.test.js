const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

describe(":::NJSCPAQLBE_TEST_SUITE_1:::Tests for CRUD Operations on Covid19India database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../covid19India.db");
  beforeAll(() => {
    try {
      app = require("../app.js");
      appInstance = request(app);
    } catch (error) {}

    open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
      .then(async (sqliteDB) => {
        database = sqliteDB;
      })
      .catch((error) => {
        console.error(`DB Error: ${error.message}`);
      });
  });

  it(":::NJSCPAQLBE_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPAQLBE_TEST_2:::The GET request with path '/states/' should return the list of all the states in the state table as a response", (done) => {
    appInstance
      .get("/states/")
      .expect(200)
      .expect([
        {
          stateId: 1,
          stateName: "Andaman and Nicobar Islands",
          population: 380581,
        },
        {
          stateId: 2,
          stateName: "Andhra Pradesh",
          population: 49386799,
        },
        {
          stateId: 3,
          stateName: "Arunachal Pradesh",
          population: 1382611,
        },
        {
          stateId: 4,
          stateName: "Assam",
          population: 31169272,
        },
        {
          stateId: 5,
          stateName: "Bihar",
          population: 103804637,
        },
        {
          stateId: 6,
          stateName: "Chandigarh",
          population: 1055450,
        },
        {
          stateId: 7,
          stateName: "Chhattisgarh",
          population: 25540196,
        },
        {
          stateId: 8,
          stateName: "Delhi",
          population: 16787941,
        },
        {
          stateId: 9,
          stateName: "Dadra and Nagar Haveli and Daman and Diu",
          population: 585764,
        },
        {
          stateId: 10,
          stateName: "Goa",
          population: 1457723,
        },
        {
          stateId: 11,
          stateName: "Gujarat",
          population: 60383628,
        },
        {
          stateId: 12,
          stateName: "Himachal Pradesh",
          population: 6864602,
        },
        {
          stateId: 13,
          stateName: "Haryana",
          population: 25353081,
        },
        {
          stateId: 14,
          stateName: "Jharkhand",
          population: 32966238,
        },
        {
          stateId: 15,
          stateName: "Jammu and Kashmir",
          population: 12548926,
        },
        {
          stateId: 16,
          stateName: "Karnataka",
          population: 61130704,
        },
        {
          stateId: 17,
          stateName: "Kerala",
          population: 33387677,
        },
        {
          stateId: 18,
          stateName: "Ladakh",
          population: 274000,
        },
        {
          stateId: 19,
          stateName: "Lakshadweep",
          population: 64473,
        },
        {
          stateId: 20,
          stateName: "Maharashtra",
          population: 112372972,
        },
        {
          stateId: 21,
          stateName: "Meghalaya",
          population: 2964007,
        },
        {
          stateId: 22,
          stateName: "Manipur",
          population: 2721756,
        },
        {
          stateId: 23,
          stateName: "Madhya Pradesh",
          population: 72597565,
        },
        {
          stateId: 24,
          stateName: "Mizoram",
          population: 1091014,
        },
        {
          stateId: 25,
          stateName: "Nagaland",
          population: 1980602,
        },
        {
          stateId: 26,
          stateName: "Odisha",
          population: 41947358,
        },
        {
          stateId: 27,
          stateName: "Punjab",
          population: 27704236,
        },
        {
          stateId: 28,
          stateName: "Puducherry",
          population: 1247953,
        },
        {
          stateId: 29,
          stateName: "Rajasthan",
          population: 68621012,
        },
        {
          stateId: 30,
          stateName: "Sikkim",
          population: 607688,
        },
        {
          stateId: 31,
          stateName: "Telangana",
          population: 35286757,
        },
        {
          stateId: 32,
          stateName: "Tamil Nadu",
          population: 72138958,
        },
        {
          stateId: 33,
          stateName: "Tripura",
          population: 3671032,
        },
        {
          stateId: 34,
          stateName: "Uttar Pradesh",
          population: 199812341,
        },
        {
          stateId: 35,
          stateName: "Uttarakhand",
          population: 10116752,
        },
        {
          stateId: 36,
          stateName: "West Bengal",
          population: 91347736,
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_3:::The GET request with path '/states/:stateId/' should return the details of a specific state in the state table as a response", async (done) => {
    appInstance
      .get("/states/2/")
      .expect(200)
      .expect({
        stateId: 2,
        stateName: "Andhra Pradesh",
        population: 49386799,
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_4:::The GET request with path '/districts/:districtId/' should return the details of a specific district in the district table as a response", async (done) => {
    appInstance
      .get("/districts/755/")
      .expect(200)
      .expect({
        districtId: 755,
        districtName: "Nadia",
        stateId: 36,
        cases: 22816,
        cured: 22424,
        active: 72,
        deaths: 320,
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_5:::The GET request with path '/states/:stateId/stats/' should return the statistics of a specific state as a response", (done) => {
    appInstance
      .get("/states/12/stats/")
      .expect(200)
      .expect({
        totalCases: 62660,
        totalCured: 59138,
        totalActive: 2478,
        totalDeaths: 1023,
      })
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPAQLBE_TEST_6:::The GET request with path '/districts/2/details/' should return the state name of a specific district as a response", (done) => {
    appInstance
      .get("/districts/2/details/")
      .expect(200)
      .expect({
        stateName: "Andaman and Nicobar Islands",
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_7:::The POST request with path '/districts/' should return 'District Successfully Added' text as a response to the success of the request", async (done) => {
    appInstance
      .post("/districts/")
      .set("Accept", "application/json")
      .send({
        districtName: "prakasam",
        stateId: 2,
        cases: 2323343,
        cured: 33442,
        active: 234,
        deaths: 2234,
      })
      .expect(200)
      .expect("District Successfully Added")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_8:::The database should be updated on the post request", async () => {
    expect(
      await database.get(
        `SELECT * FROM district WHERE district_name='prakasam'`
      )
    ).toEqual({
      district_id: 765,
      district_name: "prakasam",
      state_id: 2,
      cases: 2323343,
      cured: 33442,
      active: 234,
      deaths: 2234,
    });
  });

  it(":::NJSCPAQLBE_TEST_9:::The PUT request with path '/districts/:districtId/' should return 'District Details Updated' text as a response to the success of the request", (done) => {
    appInstance
      .put("/districts/2/")
      .set("Accept", "application/json")
      .send({
        districtName: "Kurnool",
        stateId: 2,
        cases: 37428,
        cured: 3456,
        active: 42,
        deaths: 12,
      })
      .expect(200)
      .expect("District Details Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPAQLBE_TEST_10:::The database should be updated on the put request", async () => {
    expect(
      await database.get(`SELECT * FROM district WHERE district_id=2`)
    ).toEqual({
      district_id: 2,
      district_name: "Kurnool",
      state_id: 2,
      cases: 37428,
      cured: 3456,
      active: 42,
      deaths: 12,
    });
  });

  it(":::NJSCPAQLBE_TEST_11:::The DELETE request with path '/districts/:districtId/' should return 'District Removed' text as a response to the success of the request", (done) => {
    appInstance
      .delete("/districts/2/")
      .expect(200)
      .expect("District Removed")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPAQLBE_TEST_12:::The database should be updated on the delete request", async () => {
    expect(
      await database.get(`SELECT * FROM district WHERE district_id=2`)
    ).toEqual(undefined);
  });
});
