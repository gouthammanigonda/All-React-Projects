const fs = require("fs");
const path = require("path");
const request = require("supertest");
const app = require("../app");
const babel = require("@babel/parser");
const { getListOfTotalIdentifiers } = require("./utils");

describe(":::NJSCPNVCUW_TEST_SUITE_1:::Tests for Gadgets Page", () => {
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

  it(":::NJSCPNVCUW_TEST_1:::Import the express package in the 'app.js' file", () => {
    const result = getListOfTotalIdentifiers(appFileBabelObject);

    expect(
      result.some(
        (eachResult) =>
          eachResult.module.match(/express/g) !== null &&
          eachResult.method === "require"
      )
    ).toBe(true);
  });

  it(":::NJSCPNVCUW_TEST_2:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPNVCUW_TEST_3:::Send the 'gadgets.html' file as a response to the request with path '/'", (done) => {
    const responseText = fs.readFileSync("./.tests/gadgets.html", {
      encoding: "utf-8",
    });
    request(app)
      .get("/gadgets")
      .expect("Content-Type", /html/g)
      .expect(200)
      .then((res) => {
        expect(res.text).toBe(responseText);
        done();
      })
      .catch((err) => {});
  });
});
