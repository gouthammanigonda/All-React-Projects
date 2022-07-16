const fs = require("fs");
const path = require("path");
const { getListOfTotalExports } = require("./utils");
const babel = require("@babel/parser");

let getDateAfterDays;

describe(":::NJSCPKWIWO_TEST_SUITE_1:::Tests for Get Date After X Days", () => {
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  let exportFileBabelObject;

  beforeAll(() => {
    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../index.js"),
        "utf-8"
      );
      getDateAfterDays = require("../index.js");

      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPKWIWO_TEST_1:::A file should present with the name 'index.js'", () => {
    const absolutePath = path.join(__dirname, "../index.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPKWIWO_TEST_2:::A Function should be exported from the file 'index.js' using the default export method", () => {
    expect(getListOfTotalExports(exportFileBabelObject)[0].identifierName).toBe(
      "module"
    );
  });
});

describe(":::NJSCPKWIWO_TEST_SUITE_2:::Tests for Get Date After X Days", () => {
  it(":::NJSCPKWIWO_TEST_3:::The Function should return the date after x days from 22nd August 2020", () => {
    expect(`${getDateAfterDays(256)}`).toMatch(/^5-5-2021$|^5-05-2021$/);
  });
});
