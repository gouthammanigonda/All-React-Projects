const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

describe(":::NJSCPXTWMS_TEST_SUITE_1:::Tests for Cricket Team Database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../cricketTeam.db");
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

  it(":::NJSCPXTWMS_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPXTWMS_TEST_2:::The GET request with path '/players/' should return the list of all the players in the team as a response", (done) => {
    appInstance
      .get("/players/")
      .expect(200)
      .expect([
        {
          playerId: 1,
          playerName: "Vasanth",
          jerseyNumber: 5,
          role: "All-rounder",
        },
        {
          playerId: 2,
          playerName: "Trivi",
          jerseyNumber: 3,
          role: "All-rounder",
        },
        {
          playerId: 3,
          playerName: "Babu",
          jerseyNumber: 18,
          role: "Batsman",
        },
        {
          playerId: 4,
          playerName: "Venkat",
          jerseyNumber: 19,
          role: "Batsman",
        },
        {
          playerId: 5,
          playerName: "Vamsi",
          jerseyNumber: 2,
          role: "Batsman",
        },
        {
          playerId: 6,
          playerName: "Hari",
          jerseyNumber: 22,
          role: "Bowler",
        },
        {
          playerId: 7,
          playerName: "Harish",
          jerseyNumber: 7,
          role: "Batsman",
        },
        {
          playerId: 8,
          playerName: "Chanakya",
          jerseyNumber: 1,
          role: "Bowler",
        },
        {
          playerId: 9,
          playerName: "Vinod",
          jerseyNumber: 8,
          role: "Wicket-keeper",
        },
        {
          playerId: 10,
          playerName: "Gowtham",
          jerseyNumber: 6,
          role: "Bowler",
        },
        {
          playerId: 11,
          playerName: "Varshith",
          jerseyNumber: 11,
          role: "All-rounder",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPXTWMS_TEST_3:::The GET request with path '/players/:playerId/' should return the details of a particular player in the team as a response", async (done) => {
    appInstance
      .get("/players/3/")
      .expect(200)
      .expect({
        playerId: 3,
        playerName: "Babu",
        jerseyNumber: 18,
        role: "Batsman",
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPXTWMS_TEST_4:::The POST request with path '/players/' should return the 'Player Added to Team' text as a response to the success of the request", async (done) => {
    appInstance
      .post("/players/")
      .set("Accept", "application/json")
      .send({
        playerName: "Ramu",
        jerseyNumber: 17,
        role: "Batsman",
      })
      .expect(200)
      .expect("Player Added to Team")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPXTWMS_TEST_5:::The database should be updated on the post request", async () => {
    expect(
      await database.get(`SELECT * FROM cricket_team WHERE player_id=12`)
    ).toEqual({
      player_id: 12,
      player_name: "Ramu",
      jersey_number: 17,
      role: "Batsman",
    });
  });

  it(":::NJSCPXTWMS_TEST_6:::The PUT request with path '/players/:playerId/' should return 'Player Details Updated' text as a response to the success of the request", async (done) => {
    appInstance
      .put("/players/4/")
      .set("Accept", "application/json")
      .send({
        playerName: "Rahul",
        jerseyNumber: 7,
        role: "Batsman",
      })
      .expect(200)
      .expect("Player Details Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPXTWMS_TEST_7:::The database should be updated on the put request", async () => {
    expect(
      await database.get(`SELECT * FROM cricket_team WHERE player_id=4`)
    ).toEqual({
      player_id: 4,
      player_name: "Rahul",
      jersey_number: 7,
      role: "Batsman",
    });
  });

  it(":::NJSCPXTWMS_TEST_8:::The DELETE request with path '/players/:playerId/' should return 'Player Removed' text as a response to the success of the request", async (done) => {
    const table = await database.all("SELECT * FROM cricket_team");
    appInstance
      .delete("/players/12/")
      .expect(200)
      .expect("Player Removed")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPXTWMS_TEST_9:::The database should be updated on the delete request", async () => {
    expect(await database.all(`SELECT * FROM cricket_team`)).toEqual([
      {
        player_id: 1,
        player_name: "Vasanth",
        jersey_number: 5,
        role: "All-rounder",
      },
      {
        player_id: 2,
        player_name: "Trivi",
        jersey_number: 3,
        role: "All-rounder",
      },
      {
        player_id: 3,
        player_name: "Babu",
        jersey_number: 18,
        role: "Batsman",
      },
      {
        player_id: 4,
        player_name: "Rahul",
        jersey_number: 7,
        role: "Batsman",
      },
      {
        player_id: 5,
        player_name: "Vamsi",
        jersey_number: 2,
        role: "Batsman",
      },
      {
        player_id: 6,
        player_name: "Hari",
        jersey_number: 22,
        role: "Bowler",
      },
      {
        player_id: 7,
        player_name: "Harish",
        jersey_number: 7,
        role: "Batsman",
      },
      {
        player_id: 8,
        player_name: "Chanakya",
        jersey_number: 1,
        role: "Bowler",
      },
      {
        player_id: 9,
        player_name: "Vinod",
        jersey_number: 8,
        role: "Wicket-keeper",
      },
      {
        player_id: 10,
        player_name: "Gowtham",
        jersey_number: 6,
        role: "Bowler",
      },
      {
        player_id: 11,
        player_name: "Varshith",
        jersey_number: 11,
        role: "All-rounder",
      },
    ]);
  });
});
