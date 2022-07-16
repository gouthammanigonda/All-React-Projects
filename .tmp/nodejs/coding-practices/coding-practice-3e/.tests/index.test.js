const request = require("supertest");
const app = require("../app");
const { getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");
const path = require("path");
const fs = require("fs");

const dateTime = new Date();
const result = `${dateTime.getDate()}-${
  dateTime.getMonth() + 1
}-${dateTime.getFullYear()}`;

describe(":::NJSCPJDCSO_TEST_SUITE_1:::Tests for Today's Date", () => {
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
  it(":::NJSCPJDCSO_TEST_1:::Import the express package in the 'app.js' file", () => {
    const result = getListOfTotalIdentifiers(appFileBabelObject);
    expect(
      result.some(
        (eachResult) =>
          eachResult.module.match(/express/g) !== null &&
          eachResult.method === "require"
      )
    ).toBe(true);
  });

  it(":::NJSCPJDCSO_TEST_2:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPJDCSO_TEST_3:::Send today's date string in 'DD-MM-YYYY' format as a response to the request with path '/'", (done) => {
    request(app)
      .get("/")
      .expect("Content-Type", /text/)
      .expect(200)
      .expect(result)
      .then((error, res) => {
        done();
      });
  });
});
