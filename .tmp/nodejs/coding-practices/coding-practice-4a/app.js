const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DBError:${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const convertDBObject = (obj) => {
  return {
    playerName: obj.player_name,
    playerId: obj.player_id,
    jerseyNumber: obj.jersey_number,
    role: obj.role,
  };
};

//1.GET Players APL:
app.get("/players/", async (request, response) => {
  try {
    const getPlayersQuery = `
    SELECT 
      *
    FROM
      cricket_team
    `;
    const playersList = await db.all(getPlayersQuery);
    response.send(playersList.map((each) => convertDBObject(each)));
  } catch {
    console.log(`DBError:${e.message}; IN GET method`);
  }
});

//2.POST add a Player API:
app.post("/players/", async (request, response) => {
  try {
    let playerDetails = request.body;
    let { playerName, jerseyNumber, role } = playerDetails;
    const postPlayerQuery = `
    INSERT INTO
     cricket_team(player_name,jersey_number,role)
    VALUES
     ('${playerName}','${jerseyNumber}','${role}');
    `;
    const addedPlayer = await db.run(postPlayerQuery);
    response.send(`Player Added to Team`);
  } catch (e) {
    console.log(`DBError:${e.message}; IN POST method`);
  }
});

//3.GET Player From Id API:
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const getPlayerQuery = `
    SELECT 
      *
    FROM
      cricket_team
    WHERE 
      player_id = ${playerId};
    `;
  const player = await db.get(getPlayerQuery);
  response.send(convertDBObject(player));
});

//4.PUT update Player API:
app.put("/players/:playerId/", async (request, response) => {
  try {
    const { playerName, jerseyNumber, role } = request.body;
    const { playerId } = request.params;
    const updatePlayerQuery = `
    UPDATE
      cricket_team
    SET 
      player_name = '${playerName}',
      jersey_number = '${jerseyNumber}',
      role = '${role}'
    WHERE 
      player_id = ${playerId};
    `;
    const updatedPlayer = await db.run(updatePlayerQuery);
    response.send(`Player Details Updated`);
  } catch (e) {
    console.log(`DBError:${e.message}; IN PUT method`);
  }
});

//5.DELETE Player API:
app.delete("/players/:playerId/", (request, response) => {
  const { playerId } = request.params;
  const deletePlayerQuery = `
    DELETE FROM
      cricket_team
    WHERE
      player_id = ${playerId}
    `;
  const deletedPlayer = db.run(deletePlayerQuery);
  response.send("Player Removed");
});
module.exports = app;
