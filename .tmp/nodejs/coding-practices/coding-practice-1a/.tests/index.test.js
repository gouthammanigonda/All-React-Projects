const fs = require("fs");
const path = require("path");
const { getListOfTotalExports, getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

let importFile;
let exportFile;
let canDance;

describe(":::NJSCPANCPR_TEST_SUITE_1:::Tests for Import and Export of a Boolean using Common JS Module Syntax", () => {
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
        path.join(__dirname, "../importBoolean.js"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}

    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportBoolean.js"),
        "utf-8"
      );
      canDance = require("../exportBoolean.js");
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPANCPR_TEST_1:::A file should be created with the name 'exportBoolean.js'", () => {
    const absolutePath = path.join(__dirname, "../exportBoolean.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPANCPR_TEST_2:::A file should be created with the name 'importBoolean.js'", () => {
    const absolutePath = path.join(__dirname, "../importBoolean.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPANCPR_TEST_3:::A Boolean should be exported from the file 'exportBoolean.js' as default export using the common JS module syntax", () => {
    expect(getListOfTotalExports(exportFileBabelObject)[0].identifierName).toBe(
      "module"
    );
  });

  it(":::NJSCPANCPR_TEST_4:::A Boolean should be imported in the file 'importBoolean.js' using the common JS module syntax", () => {
    const resultObject = getListOfTotalIdentifiers(importFileBabelObject)[0];
    expect(
      resultObject.module.match(/\.\/exportBoolean/g) &&
        resultObject.method === "require"
    ).toBe(true);
  });
});

describe(":::NJSCPANCPR_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPANCPR_TEST_5:::A Boolean should be exported with a specified value from the file 'exportBoolean.js'", () => {
    expect(canDance).toBe(true);
  });
});
