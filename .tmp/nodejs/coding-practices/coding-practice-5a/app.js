const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());
const dbPath = path.join(__dirname, "moviesData.db");

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
    console.log(`DBError:${e.message}`);
  }
};
initialiseDBAndServer();

const convertMovieDBObjectToResponseObject = (obj) => {
  return {
    movieId: obj.movie_id,
    directorId: obj.director_id,
    movieName: obj.movie_name,
    leadActor: obj.lead_actor,
  };
};

const convertDirectorDBObjectToResponseObject = (obj) => {
  return {
    directorId: obj.director_id,
    directorName: obj.director_name,
  };
};

//1.GET movies API:
app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
    SELECT * FROM movie
    `;
  const movieList = await db.all(getMoviesQuery);
  response.send(movieList.map((each) => ({ movieName: each.movie_name })));
});

//2.POST creating a movie API:
app.post("/movies/", async (request, response) => {
  try {
    const { directorId, movieName, leadActor } = request.body;
    const postMovieQuery = `
    INSERT INTO
      movie(director_id,movie_name,lead_actor)
    VALUES
      (${directorId},'${movieName}','${leadActor}')
    `;
    await db.run(postMovieQuery);
    response.send(`Movie Successfully Added`);
  } catch (e) {
    console.log(`DBError:${e.message}`);
  }
});

//3.GET movie API:
app.get("/movies/:movieId/", async (request, response) => {
  try {
    const { movieId } = request.params;
    console.log(movieId);
    const getMovieQuery = `
    SELECT
      *
    FROM
      movie
    WHERE
      movie_id = ${movieId}
    `;
    const movie = await db.get(getMovieQuery);
    //console.log(movie);
    response.send(convertMovieDBObjectToResponseObject(movie));
  } catch (e) {
    console.log(`DBError:${e.message}`);
  }
});

//4.PUT Update movie API:
app.put("/movies/:movieId/", async (request, response) => {
  try {
    const { directorId, movieName, leadActor } = request.body;
    const { movieId } = request.params;
    console.log(directorId, movieName, leadActor, movieId);
    const updateMovieQuery = `
    UPDATE
      movie
    SET
      director_id = ${directorId},
      movie_name = '${movieName}',
      lead_actor = '${leadActor}'
    WHERE
      movie_id = ${movieId}
    `;
    await db.run(updateMovieQuery);
    response.send(`Movie Details Updated`);
  } catch (e) {
    console.log(`DBError:${e.message}`);
  }
});

//5.DELETE movie API:
app.delete("/movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const deleteMovieQuery = `
    DELETE FROM 
      movie
    WHERE
      movie_id = ${movieId}
    `;
  await db.run(deleteMovieQuery);
  response.send("Movie Removed");
});

//6.GET directors API:
app.get("/directors/", async (request, response) => {
  const getDirectorsQuery = `
    SELECT * FROM director
    `;
  const director = await db.all(getDirectorsQuery);
  response.send(
    director.map((each) => convertDirectorDBObjectToResponseObject(each))
  );
});

//7.GET movies by director_id API:
app.get("/directors/:directorId/movies/", async (request, response) => {
  try {
    const { directorId } = request.params;
    //console.log(directorId);
    const getMovieQuery = `
    SELECT movie_name FROM movie WHERE director_id = '${directorId}'
    `;
    const movies = await db.all(getMovieQuery);
    //console.log(movies);
    response.send(movies.map((each) => ({ movieName: each.movie_name })));
  } catch (e) {
    console.log(`DBError:${e.message}`);
  }
});

module.exports = app;
