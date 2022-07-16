const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

let appInstance;
let auth = {};
function loginUser() {
  console.log("login called");
  return function (done) {
    appInstance
      .post("/login/")
      .send({
        username: "christopher_phillips",
        password: "christy@123",
      })
      .expect(200)
      .then(onResponse);

    function onResponse(res, err) {
      auth.token = res.body.jwtToken;
      return done();
    }
  };
}
describe(":::NJSCPIKNGV_TEST_SUITE_1:::Tests for authorized operations on Covid19 India Portal database", () => {
  let app;
  let database = null;
  const databasePath = path.join(__dirname, "../covid19IndiaPortal.db");

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

  it(":::NJSCPIKNGV_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", (done) => {
    expect(typeof app).toBe("function");
    const getToken = loginUser();
    getToken(done);
  });

  it(":::NJSCPIKNGV_TEST_2:::The POST request with path '/login/' should return 'Invalid user' text as a response for an unregistered user", (done) => {
    appInstance
      .post("/login/")
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

  it(":::NJSCPIKNGV_TEST_3:::The POST request with path '/login/' should return 'Invalid password' text as a response if the user provides an incorrect password", (done) => {
    appInstance
      .post("/login/")
      .set("Accept", "application/json")
      .send({
        username: "christopher_phillips",
        password: "kara@44",
      })
      .expect(400)
      .expect("Invalid password")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_4:::The POST request with path '/login/' should return JWT token as a response if the user provides correct credentials", (done) => {
    appInstance
      .post("/login/")
      .set("Accept", "application/json")
      .send({ username: "christopher_phillips", password: "christy@123" })
      .expect(200)
      .then((response, error) => {
        expect(typeof JSON.parse(response.text).jwtToken).toBe("string");
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_5:::The GET request with path '/states/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
    appInstance
      .get("/states/")
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_6:::The GET request with path '/states/' with token should return the list of all the states in the state table as a response", (done) => {
    appInstance
      .get("/states/")
      .set("Authorization", "bearer " + auth.token)
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
      .then((response, error) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_7:::The GET request with path '/states/:stateId/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
    appInstance
      .get("/states/2/")
      .set("Authorization", "bearer " + auth.token + "fhbek")
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_8:::The GET request with path '/states/:stateId/' with token should return the details of a specific state in the state table as a response", (done) => {
    appInstance
      .get("/states/2/")
      .set("Authorization", "bearer " + auth.token)
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

  it(":::NJSCPIKNGV_TEST_9:::The GET request with path '/districts/:districtId/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
    appInstance
      .get("/districts/755/")
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_10:::The GET request with path '/districts/:districtId/' with token should return the details of a specific district in the district table as a response", (done) => {
    appInstance
      .get("/districts/755/")
      .set("Authorization", "bearer " + auth.token)
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

  it(":::NJSCPIKNGV_TEST_11:::The GET request with path '/states/:stateId/stats/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
    appInstance
      .get("/states/12/stats/")
      .set("Authorization", "bearer " + auth.token + "fhbek")
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_12:::The GET request with path '/states/:stateId/stats/' with token should return the statistics of a specific state as a response", (done) => {
    appInstance
      .get("/states/12/stats/")
      .set("Authorization", "bearer " + auth.token)
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

  it(":::NJSCPIKNGV_TEST_13:::The POST request with path '/districts/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
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
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_14:::The POST request with path '/districts/' with token should return 'District Successfully Added' text as a response to the success of the request", (done) => {
    appInstance
      .post("/districts/")
      .set("Authorization", "bearer " + auth.token)
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
  it(":::NJSCPIKNGV_TEST_15:::The database should be updated on the post request", async () => {
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

  it(":::NJSCPIKNGV_TEST_16:::The PUT request with path '/districts/:districtId/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
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
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_17:::The PUT request with path '/districts/:districtId/' with token should return 'District Details Updated' text as a response to the success of the request", (done) => {
    appInstance
      .put("/districts/2/")
      .set("Authorization", "bearer " + auth.token)
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

  it(":::NJSCPIKNGV_TEST_18:::The database should be updated on the put request", async () => {
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

  it(":::NJSCPIKNGV_TEST_19:::The DELETE request with path '/districts/:districtId/' without token should return status code as '401' and 'Invalid JWT Token' text as a response", (done) => {
    appInstance
      .delete("/districts/2/")
      .set("Authorization", "bearer " + auth.token + "fhbek")
      .expect(401)
      .expect("Invalid JWT Token")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPIKNGV_TEST_20:::The DELETE request with path '/districts/:districtId/' with token should return 'District Removed' text as a response to the success of the request", (done) => {
    appInstance
      .delete("/districts/2/")
      .set("Authorization", "bearer " + auth.token)
      .expect(200)
      .expect("District Removed")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPIKNGV_TEST_21:::The database should be updated on the delete request", async () => {
    expect(
      await database.get(`SELECT * FROM district WHERE district_id=2`)
    ).toEqual(undefined);
  });
});
