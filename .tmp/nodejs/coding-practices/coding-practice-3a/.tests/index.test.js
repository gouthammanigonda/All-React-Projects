const request = require("supertest");
const app = require("../app");
const { getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");
const path = require("path");
const fs = require("fs");
const addDays = require("date-fns/addDays");

const dateTime = new Date();
const newDate = addDays(
  new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate()),
  100
);
const result = `${newDate.getDate()}/${
  newDate.getMonth() + 1
}/${newDate.getFullYear()}`;

describe(":::NJSCPLCGSI_TEST_SUITE_1:::Tests for Date After Hundred Days from Today", () => {
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

  it(":::NJSCPLCGSI_TEST_1:::Import the express and date-fns packages", () => {
    const result = getListOfTotalIdentifiers(appFileBabelObject);
    expect(
      result.filter(
        (eachResult) =>
          eachResult.module.match(/express/g) !== null ||
          (eachResult.module.match(/date-fns/g) !== null &&
            eachResult.method === "require")
      ).length
    ).toBe(2);
  });

  it(":::NJSCPLCGSI_TEST_2:::An Express instance should be exported from the 'app.js' file using the default export syntax", () => {
    expect(typeof app).toBe("function");
  });

  it(":::NJSCPLCGSI_TEST_3:::Send the date string of date after 100 days from today in 'DD/MM/YYYY' format as a response to the request with path '/'", (done) => {
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
