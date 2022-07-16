const fs = require("fs");
const path = require("path");
const { getListOfTotalExports, getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

let importFile;
let exportFile;
let statement;

describe(":::NJSCPGHTSD_TEST_SUITE_1:::Tests for Import and Export of a Function using Common JS Module Syntax", () => {
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  let exportFileBabelObject;
  let importFileBabelObject;

  beforeAll(() => {
    try {
      importFile = fs.readFileSync(
        path.join(__dirname, "../importFunction.js"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}

    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportFunction.js"),
        "utf-8"
      );
      statement = require("../exportFunction.js");
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPGHTSD_TEST_1:::A file should be created with the name 'exportFunction.js'", () => {
    const absolutePath = path.join(__dirname, "../exportFunction.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPGHTSD_TEST_2:::A file should be created with the name 'importFunction.js'", () => {
    const absolutePath = path.join(__dirname, "../importFunction.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPGHTSD_TEST_3:::A Function should be exported from the file 'exportFunction.js' as default using the common JS module syntax", () => {
    expect(getListOfTotalExports(exportFileBabelObject)[0].identifierName).toBe(
      "module"
    );
  });

  it(":::NJSCPGHTSD_TEST_4:::A Function should be imported in the file 'importFunction.js' using the common JS module syntax", () => {
    const resultObject = getListOfTotalIdentifiers(importFileBabelObject)[0];
    expect(
      resultObject.module.match(/\.\/exportFunction/g) &&
        resultObject.method === "require"
    ).toBe(true);
  });
});

describe(":::NJSCPGHTSD_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPGHTSD_TEST_5:::The function exported from the file 'exportFunction.js' should return the specified string", () => {
    expect(statement()).toBe("This is a Function");
  });
});
