const request = require("supertest");
const app = require("../app");
const babel = require("@babel/parser");
const path = require("path");
const { getListOfTotalIdentifiers } = require("./utils");
const fs = require("fs");

describe(":::NJSCPABXOE_TEST_SUITE_1:::Tests for Get a String", () => {
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
  it(":::NJSCPABXOE_TEST_1:::Import the express package in the 'app.js' file", () => {
    const result = getListOfTotalIdentifiers(appFileBabelObject);
    expect(
      result.some(
        (eachResult) =>
          eachResult.module.match(/express/g) !== null &&
          eachResult.method === "require"
      )
    ).toBe(true);
  });

  it(":::NJSCPABXOE_TEST_2:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPABXOE_TEST_3:::Send 'Express JS' text as a response for the request with path '/'", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /text/)
      .expect("Content-Length", "10")
      .expect(200)
      .expect("Express JS")
      .then((error, res) => {
        done();
      });
  });
});
