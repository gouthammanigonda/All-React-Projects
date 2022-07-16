const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../app");
const { getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

describe(":::NJSCPXHEEP_TEST_SUITE_1:::Tests for API Routing", () => {
  let appFile;
  let appFileBabelObject;
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  beforeAll(() => {
    try {
      appFile = fs.readFileSync(path.join(__dirname, "../app.js"), "utf-8");

      appFileBabelObject = babel.parse(appFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPXHEEP_TEST_1:::Import the express package in the 'app.js' file", () => {
    const result = getListOfTotalIdentifiers(appFileBabelObject);
    expect(
      result.some(
        (eachResult) =>
          eachResult.module.match(/express/g) !== null &&
          eachResult.method === "require"
      )
    ).toBe(true);
  });

  it(":::NJSCPXHEEP_TEST_2:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPXHEEP_TEST_3:::Send 'Home Page' text as a response to the request with path '/'", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /text/)
      .expect("Content-Length", "9")
      .expect(200)
      .expect("Home Page")
      .then((error, res) => {
        done();
      });
  });

  it(":::NJSCPXHEEP_TEST_4:::Send 'About Page' text as a response to the request with path '/about'", () => {
    request(app)
      .get("/about")
      .expect("Content-Type", /text/)
      .expect("Content-Length", "10")
      .expect(200)
      .expect("About Page")
      .then((error, res) => {
        done();
      });
  });
});
