const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "covid19India.db");
let db = null;
const initialiseDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log(`Server running at http://localhost:3000/`)
    );
  } catch (e) {
    console.log(`DBError:${e.message}`);
    process.exit(1);
  }
};
initialiseDBAndServer();

const convertDBStateToResponseObject = (dbObj) => {
  return {
    stateId: dbObj.state_id,
    stateName: dbObj.state_name,
    population: dbObj.population,
  };
};

const convertDBDistrictToResponseObject = (obj) => {
  return {
    districtId: obj.district_id,
    districtName: obj.district_name,
    stateId: obj.state_id,
    cases: obj.cases,
    cured: obj.cured,
    active: obj.active,
    deaths: obj.deaths,
  };
};

//1.GET all states API:
app.get("/states/", async (request, response) => {
  const getAllstatesQuery = `
    SELECT
      *
    FROM
      state
    `;
  const states = await db.all(getAllstatesQuery);
  response.send(states.map((each) => convertDBStateToResponseObject(each)));
});

//2.GET a state API:
app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const getAStateQuery = `
    SELECT
      *
    FROM 
      state
    WHERE
      state_id = ${stateId}
    `;
  const state = await db.get(getAStateQuery);
  response.send(convertDBStateToResponseObject(state));
});

//3.POST district API:
app.post("/districts/", async (request, response) => {
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const postDistrictQuery = `
    INSERT INTO
      district (district_name,state_id,cases,cured,active,deaths)
    VALUES
      ('${districtName}',${stateId},${cases},${cured},${active},${deaths})
    `;
  await db.run(postDistrictQuery);
  response.send("District Successfully Added");
});

//4.GET district API:
app.get("/districts/:districtId/", async (request, response) => {
  const { districtId } = request.params;
  const getDistrictQuery = `
    SELECT
      *
    FROM
      district
    WHERE
      district_id = ${districtId}
    `;
  const district = await db.get(getDistrictQuery);
  response.send(convertDBDistrictToResponseObject(district));
});

//5.DELETE district API:
app.delete("/districts/:districtId/", (request, response) => {
  const { districtId } = request.params;
  const deleteDistrictQuery = `
    DELETE FROM
      district
    WHERE 
      district_id = ${districtId}
    `;
  db.run(deleteDistrictQuery);
  response.send(`District Removed`);
});

//6.PUT district API:
app.put("/districts/:districtId/", (request, response) => {
  const { districtId } = request.params;
  const { districtName, stateId, cases, cured, active, deaths } = request.body;
  const putDistrictQuery = `
    UPDATE
      district
    SET
      district_name = '${districtName}',
      state_id = ${stateId},
      cases = ${cases},
      cured = ${cured},
      active = ${active},
      deaths = ${deaths}
    WHERE
      district_id = ${districtId}
    `;
  db.run(putDistrictQuery);
  response.send(`District Details Updated`);
});

//7.GET total cases,cured,active,deaths of district API:
app.get("/states/:stateId/stats/", async (request, response) => {
  const { stateId } = request.params;
  const getDistrictStatsQuery = `
    SELECT
      SUM(cases),
      SUM(cured),
      SUM(active),
      SUM(deaths)
    FROM
      district
    WHERE
      state_id = ${stateId}
    `;
  const stats = await db.get(getDistrictStatsQuery);
  response.send({
    totalCases: stats["SUM(cases)"],
    totalCured: stats["SUM(cured)"],
    totalActive: stats["SUM(active)"],
    totalDeaths: stats["SUM(deaths)"],
  });
});

//8.GET stateName from districtId API:
app.get("/districts/:districtId/details/", async (request, response) => {
  const { districtId } = request.params;
  const getStateNameQuery = `
    SELECT
      state_name
    FROM
      district NATURAL JOIN state
    WHERE
      district_id = ${districtId}
    `;
  const stateName = await db.get(getStateNameQuery);
  response.send({ stateName: stateName["state_name"] });
});

module.exports = app;
