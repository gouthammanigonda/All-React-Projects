const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "cricketMatchDetails.db");

let db = null;

const initialiseDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log(`Server Running at http://localhost:3000/`);
    });
  } catch (e) {
    console.log(`BDError:${e.message}`);
    process.exit(1);
  }
};
initialiseDBAndServer();

const convertPlayer_detailsToResponseObject = (obj) => {
  return {
    playerId: obj.player_id,
    playerName: obj.player_name,
  };
};

const convertMatch_detailsToResponseObject = (obj) => {
  return {
    matchId: obj.match_id,
    match: obj.match,
    year: obj.year,
  };
};

//1.GET players API:
app.get("/players/", async (request, response) => {
  try {
    const getPlayersQuery = `
    SELECT
      *
    FROM
      player_details
    `;
    const players = await db.all(getPlayersQuery);
    response.send(
      players.map((each) => convertPlayer_detailsToResponseObject(each))
    );
  } catch (e) {
    console.log(`DBError:${e.message}`);
  }
});

//2.GET player API:
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT
      *
    FROM
      player_details
    WHERE
      player_id = ${playerId}
    `;
  const player = await db.get(getPlayerQuery);
  response.send(convertPlayer_detailsToResponseObject(player));
});

//3.PUT player API:
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const { playerName } = request.body;
  const putPlayerQuery = `
    UPDATE
      player_details
    SET
      player_name = '${playerName}'
    WHERE
      Player_id = ${playerId}
    `;
  await db.run(putPlayerQuery);
  response.send(`Player Details Updated`);
});

//4.GET match_details API:
app.get("/matches/:matchId/", async (request, response) => {
  const { matchId } = request.params;
  const getMatchQuery = `
    SELECT
      *
    FROM
      match_details
    WHERE
      match_id = ${matchId}
    `;
  const match = await db.get(getMatchQuery);
  response.send(convertMatch_detailsToResponseObject(match));
});

//5.GET matches from player_id API:
app.get("/players/:playerId/matches", async (request, response) => {
  const { playerId } = request.params;
  const getMatchesQuery = `
    SELECT
      match_id,match,year
    FROM match_details NATURAL JOIN player_match_score
    WHERE
      player_id = ${playerId}
    `;
  const matches = await db.all(getMatchesQuery);
  response.send(
    matches.map((each) => convertMatch_detailsToResponseObject(each))
  );
});

//6.GET Players by Match_id API:
app.get("/matches/:matchId/players", async (request, response) => {
  const { matchId } = request.params;
  const getPlayersQuery = `
    SELECT
      *
    FROM player_details NATURAL JOIN player_match_score
    WHERE
      match_id = ${matchId}
    `;
  const players = await db.all(getPlayersQuery);
  response.send(
    players.map((each) => convertPlayer_detailsToResponseObject(each))
  );
});

//GET stats API:
app.get("/players/:playerId/playerScores", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerStatsQuery = `
    SELECT
      player_id AS playerId,
      player_name AS playerName,
      SUM(score) AS totalScore,
      SUM(fours) AS totalFours,
      SUM(sixes) AS totalSixes
    FROM
       player_match_score NATURAL JOIN player_details
    WHERE 
      player_id = ${playerId}
    `;
  const stats = await db.get(getPlayerStatsQuery);
  response.send(stats);
});

module.exports = app;
