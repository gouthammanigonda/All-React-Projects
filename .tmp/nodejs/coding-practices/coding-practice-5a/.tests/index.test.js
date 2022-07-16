const request = require("supertest");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

describe(":::NJSCPDIITB_TEST_SUITE_1:::Tests for CRUD Operations on Movies Database", () => {
  let app;
  let appInstance;
  let database = null;
  const databasePath = path.join(__dirname, "../moviesData.db");
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

  it(":::NJSCPDIITB_TEST_1:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPDIITB_TEST_2:::The GET request with path '/movies/' should return the list of all movie names in the movies database as a response", (done) => {
    appInstance
      .get("/movies/")
      .expect(200)
      .expect([
        {
          movieName: "Captain America: The First Avenger",
        },
        {
          movieName: "Captain America: The Winter Soldier",
        },
        {
          movieName: "Captain America: Civil War",
        },
        {
          movieName: "Captain America: Civil War",
        },
        {
          movieName: "Captain Marvel",
        },
        {
          movieName: "The Lord of the Rings: The Fellowship of the Ring",
        },
        {
          movieName: "Fantastic 4: Rise of the Silver Surfer",
        },
        {
          movieName: "The Lord of the Rings: The Fellowship of the Ring",
        },
        {
          movieName: "The Lord of the Rings: The Two Towers",
        },
        {
          movieName: "The Lord of the Rings: The Return of the King",
        },
        {
          movieName: "The Proposal",
        },
        {
          movieName: "Garden State",
        },
        {
          movieName: "Ala Vaikunthapurramuloo",
        },
        {
          movieName: "S/O Satyamurthy",
        },
        {
          movieName: "Oh Baby",
        },
        {
          movieName: "Ala Modalaindi",
        },
        {
          movieName: "Fight Club",
        },
        {
          movieName: "Nannaku Prematho",
        },
        {
          movieName: "1 - Nenokkadine",
        },
        {
          movieName: "Simhadri",
        },
        {
          movieName: "Student No. 1",
        },
        {
          movieName: "Maryada Ramanna",
        },
        {
          movieName: "Soorarai Pottru",
        },
        {
          movieName: "24",
        },
        {
          movieName: "Raavanan",
        },
        {
          movieName: "OK Kanmani",
        },
        {
          movieName: "Bigil",
        },
        {
          movieName: "Theri",
        },
        {
          movieName: "96",
        },
        {
          movieName: "Imaikkaa Nodigal",
        },
        {
          movieName: "Sarkar",
        },
        {
          movieName: "Talvar",
        },
        {
          movieName: "Baby",
        },
        {
          movieName: "Bajrangi Bhaijaan",
        },
        {
          movieName: "Bajirao Mastani",
        },
        {
          movieName: "Padmavat",
        },
        {
          movieName: "Raazi",
        },
        {
          movieName: "Chhapaak",
        },
        {
          movieName: "Malang",
        },
        {
          movieName: "Ae Dil Hai Mushkil",
        },
        {
          movieName: "Humpty Sharma Ki Dulhania",
        },
        {
          movieName: "Badrinath Ki Dulhania",
        },
        {
          movieName: "Manikarnika: The Queen of Jhansi",
        },
        {
          movieName: "Manikarnika: The Queen of Jhansi",
        },
        {
          movieName: "Gully Boy",
        },
        {
          movieName: "Harry Potter and the Sorcerers Stone.",
        },
        {
          movieName: "Harry Potter and the Chamber of Secrets",
        },
        {
          movieName: "Harry Potter and the Prisoner of Azkaban.",
        },
        {
          movieName: "Harry Potter and the Goblet of Fire.",
        },
        {
          movieName: "Harry Potter and the Order of the Phoenix.",
        },
        {
          movieName: "Harry Potter and the Half-Blood Prince",
        },
        {
          movieName: "Harry Potter and the Deathly Hallows â Part 1.",
        },
        {
          movieName: "Thor",
        },
        {
          movieName: "Thor: The Dark World",
        },
        {
          movieName: "Thor: Ragnarok",
        },
        {
          movieName: "Titanic",
        },
        {
          movieName: "Jurassic Park",
        },
        {
          movieName: "Batman",
        },
        {
          movieName: "Avatar",
        },
        {
          movieName: "Iron Man",
        },
        {
          movieName: "Iron Man 2",
        },
        {
          movieName: "Iron Man 3",
        },
        {
          movieName: "Seetharamaiah Gari Manavaralu",
        },
        {
          movieName: "Aditya 369",
        },
        {
          movieName: "Anukuram",
        },
        {
          movieName: "Sindhuram",
        },
        {
          movieName: "Yerra Mandaram",
        },
        {
          movieName: "Swathi Kiranam",
        },
        {
          movieName: "Shiva",
        },
        {
          movieName: "Sirivennela",
        },
        {
          movieName: "Swarnakamalam",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPDIITB_TEST_3:::The GET request with path '/movies/:movieId/' should return the details of a specific movie in the movies database as a response", async (done) => {
    appInstance
      .get("/movies/51/")
      .expect(200)
      .expect({
        movieId: 51,
        directorId: 4,
        movieName: "The Lord of the Rings: The Fellowship of the Ring",
        leadActor: "Elijah Wood",
      })
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPDIITB_TEST_4:::The POST request with path '/movies/' should return 'Movie Successfully Added' text as a response to the success of the request", async (done) => {
    appInstance
      .post("/movies/")
      .set("Accept", "application/json")
      .send({
        directorId: 4,
        movieName: "Anonymous",
        leadActor: "Rahul",
      })
      .expect(200)
      .expect("Movie Successfully Added")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPDIITB_TEST_5:::The database should be updated on the post request", async () => {
    expect(
      await database.get(`SELECT * FROM movie WHERE movie_name='Anonymous'`)
    ).toEqual({
      movie_id: 117,
      director_id: 4,
      movie_name: "Anonymous",
      lead_actor: "Rahul",
    });
  });

  it(":::NJSCPDIITB_TEST_6:::The PUT request with path '/movies/:movieId/' should return 'Movie Details Updated' text as a response to the success of the request", (done) => {
    appInstance
      .put("/movies/65/")
      .set("Accept", "application/json")
      .send({
        directorId: 13,
        movieName: "Simhadri",
        leadActor: "Akshay",
      })
      .expect(200)
      .expect("Movie Details Updated")
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPDIITB_TEST_7:::The database should be updated on the put request", async () => {
    expect(await database.get(`SELECT * FROM movie WHERE movie_id=65`)).toEqual(
      {
        movie_id: 65,
        director_id: 13,
        movie_name: "Simhadri",
        lead_actor: "Akshay",
      }
    );
  });

  it(":::NJSCPDIITB_TEST_8:::The DELETE request with path '/movies/:movieId/' should return 'Movie Removed' text as a response to the success of the request", (done) => {
    appInstance
      .delete("/movies/65/")
      .expect(200)
      .expect("Movie Removed")
      .then((error, response) => {
        done();
      });
  });
  it(":::NJSCPDIITB_TEST_9:::The database should be updated on the delete request", async () => {
    expect(await database.get(`SELECT * FROM movie WHERE movie_id=65`)).toEqual(
      undefined
    );
  });

  it(":::NJSCPDIITB_TEST_10:::The GET request with path '/directors/' should return the list of all the directors in the movies database as a response", (done) => {
    appInstance
      .get("/directors/")
      .expect(200)
      .expect([
        {
          directorId: 1,
          directorName: "Joe Johnston",
        },
        {
          directorId: 2,
          directorName: "Joe Russo",
        },
        {
          directorId: 3,
          directorName: "Anthony Russo",
        },
        {
          directorId: 4,
          directorName: "Anna Boden",
        },
        {
          directorId: 5,
          directorName: "Tim Story",
        },
        {
          directorId: 6,
          directorName: "Peter Jackson",
        },
        {
          directorId: 7,
          directorName: "Anne Fletcher",
        },
        {
          directorId: 8,
          directorName: "Zach Braff",
        },
        {
          directorId: 9,
          directorName: "Trivikram",
        },
        {
          directorId: 10,
          directorName: "Nandini Reddy",
        },
        {
          directorId: 11,
          directorName: "Munna",
        },
        {
          directorId: 12,
          directorName: "Sukumar",
        },
        {
          directorId: 13,
          directorName: "S.S. Rajamouli",
        },
        {
          directorId: 14,
          directorName: "Sudha K Prasad",
        },
        {
          directorId: 15,
          directorName: "Vikram Kumar",
        },
        {
          directorId: 16,
          directorName: "Mani Ratnam",
        },
        {
          directorId: 17,
          directorName: "Atlee Kumar",
        },
        {
          directorId: 18,
          directorName: "C. Prem Kumar",
        },
        {
          directorId: 19,
          directorName: "R. Ajay Gnanamuthu",
        },
        {
          directorId: 20,
          directorName: "A.R. Murugadoss",
        },
        {
          directorId: 21,
          directorName: "Koratala Siva",
        },
        {
          directorId: 22,
          directorName: "Neeraj Pandey",
        },
        {
          directorId: 23,
          directorName: "Kabir Khan",
        },
        {
          directorId: 24,
          directorName: "Gunasekhar",
        },
        {
          directorId: 25,
          directorName: "Mohit Suri",
        },
        {
          directorId: 26,
          directorName: "Karan Johar",
        },
        {
          directorId: 27,
          directorName: "Vittalacharya",
        },
        {
          directorId: 28,
          directorName: "Radha Krishna Jagarlamudi",
        },
        {
          directorId: 29,
          directorName: "Zoya Akhtar",
        },
        {
          directorId: 30,
          directorName: "Chris Columbus",
        },
        {
          directorId: 31,
          directorName: "Alfonso Cuar",
        },
        {
          directorId: 32,
          directorName: "Mike Newell",
        },
        {
          directorId: 33,
          directorName: "David Yates",
        },
        {
          directorId: 34,
          directorName: "Kenneth Branagh",
        },
        {
          directorId: 35,
          directorName: "Alan Taylor",
        },
        {
          directorId: 36,
          directorName: "Taika Waititi",
        },
        {
          directorId: 37,
          directorName: "James Cameron",
        },
        {
          directorId: 38,
          directorName: "Steven Spielberg",
        },
        {
          directorId: 39,
          directorName: "Tim Burton",
        },
        {
          directorId: 40,
          directorName: "Jon Favreau",
        },
        {
          directorId: 41,
          directorName: "Shane Black",
        },
        {
          directorId: 42,
          directorName: "Kranthi Kumar",
        },
        {
          directorId: 43,
          directorName: "Singeetam Srinivasa Rao",
        },
        {
          directorId: 44,
          directorName: "Uma Maheswara Rao",
        },
        {
          directorId: 45,
          directorName: "Krishna Vamsi",
        },
        {
          directorId: 46,
          directorName: "Muthyala Subbaiah",
        },
        {
          directorId: 47,
          directorName: "K. Viswanath",
        },
        {
          directorId: 48,
          directorName: "Ram Gopal Varma",
        },
      ])
      .then((error, response) => {
        done();
      });
  });

  it(":::NJSCPDIITB_TEST_11:::The GET request with path '/directors/:directorId/movies/' should return the list of all movie names directed by a specific director as a response to the success of the request", (done) => {
    appInstance
      .get("/directors/4/movies")
      .expect(200)
      .expect([
        {
          movieName: "Captain Marvel",
        },
        {
          movieName: "The Lord of the Rings: The Fellowship of the Ring",
        },
        {
          movieName: "Anonymous",
        },
      ])
      .then((error, response) => {
        done();
      });
  });
});
