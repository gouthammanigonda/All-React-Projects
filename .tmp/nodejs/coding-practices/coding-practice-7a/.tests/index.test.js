const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

describe(":::NJSCPSCVYL_TEST_SUITE_1:::Tests for Operations on cricket match details database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../cricketMatchDetails.db");
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

  it(":::NJSCPSCVYL_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPSCVYL_TEST_2:::The GET request with path '/players/' should return the list of all the players in the player details table as a response", (done) => {
    appInstance
      .get("/players/")
      .expect(200)
      .expect([
        {
          playerId: 1,
          playerName: "Ram",
        },
        {
          playerId: 2,
          playerName: "Joseph",
        },
        {
          playerId: 3,
          playerName: "Lokesh",
        },
        {
          playerId: 4,
          playerName: "David",
        },
        {
          playerId: 5,
          playerName: "Viraj",
        },
        {
          playerId: 6,
          playerName: "Joseph",
        },
        {
          playerId: 7,
          playerName: "Shyam",
        },
        {
          playerId: 8,
          playerName: "Stark",
        },
        {
          playerId: 9,
          playerName: "Ramesh",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_3:::The GET request with path '/players/:playerId/' should return the details of a specific player in the player details table as a response", async (done) => {
    appInstance
      .get("/players/4/")
      .expect(200)
      .expect({
        playerId: 4,
        playerName: "David",
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_4:::The PUT request with path '/players/:playerId/' should return 'Player Details Updated' text as a response upon success", async (done) => {
    appInstance
      .put("/players/5/")
      .set("Accept", "application/json")
      .send({
        playerName: "Vijay",
      })
      .expect(200)
      .expect("Player Details Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_5:::The database should be updated on the put request", async () => {
    expect(
      await database.get(`SELECT * FROM player_details WHERE player_id=5;`)
    ).toEqual({
      player_id: 5,
      player_name: "Vijay",
    });
  });
  it(":::NJSCPSCVYL_TEST_6:::The GET request with path '/matches/:matchId/' should return the details of a specific match in the natch details table as a response", async (done) => {
    appInstance
      .get("/matches/9/")
      .expect(200)
      .expect({
        matchId: 9,
        match: "CSK vs RR",
        year: 2010,
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_7:::The GET request with path '/players/:playerId/matches/' should return the list of all matches of a player as a response", async (done) => {
    appInstance
      .get("/players/2/matches/")
      .expect(200)
      .expect([
        {
          matchId: 1,
          match: "RR vs SRH",
          year: 2011,
        },
        {
          matchId: 9,
          match: "CSK vs RR",
          year: 2010,
        },
        {
          matchId: 10,
          match: "MI vs SRH",
          year: 2012,
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_8:::The GET request with path '/matches/:matchId/players' should return the list of all players in a match as a response", async (done) => {
    appInstance
      .get("/matches/9/players")
      .expect(200)
      .expect([
        {
          playerId: 8,
          playerName: "Stark",
        },
        {
          playerId: 1,
          playerName: "Ram",
        },
        {
          playerId: 2,
          playerName: "Joseph",
        },
        {
          playerId: 4,
          playerName: "David",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPSCVYL_TEST_9:::The GET request with path '/players/:playerId/playerScores/' should return the player details and total score, number of fours and sixes of a player as a response", (done) => {
    appInstance
      .get("/players/3/playerScores/")
      .expect(200)
      .expect({
        playerId: 3,
        playerName: "Lokesh",
        totalScore: 186,
        totalFours: 4,
        totalSixes: 24,
      })
      .then((error, response) => {
        done();
      });
  });
});
