const fs = require("fs");
const path = require("path");
const { getListOfTotalExports, getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

let importFile;
let exportFile;
let person;

describe(":::NJSCPJLEPF_TEST_SUITE_1:::Tests for Import and Export an Object using Common JS Module Syntax", () => {
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
        path.join(__dirname, "../importObject.js"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}

    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportObject.js"),
        "utf-8"
      );
      person = require("../exportObject.js");
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPJLEPF_TEST_1:::A file should be created with the name 'exportObject.js'", () => {
    const absolutePath = path.join(__dirname, "../exportObject.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPJLEPF_TEST_2:::A file should be created with the name 'importObject.js'", () => {
    const absolutePath = path.join(__dirname, "../importObject.js");
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPJLEPF_TEST_3:::An Object should be exported from the file 'exportObject.js' as default using the common JS module syntax", () => {
    expect(getListOfTotalExports(exportFileBabelObject)[0].identifierName).toBe(
      "module"
    );
  });

  it(":::NJSCPJLEPF_TEST_4:::An Object should be imported in the file 'importObject.js' using the common JS module syntax", () => {
    const resultObject = getListOfTotalIdentifiers(importFileBabelObject)[0];
    expect(
      resultObject.module.match(/\.\/exportObject/g) &&
        resultObject.method === "require"
    ).toBe(true);
  });
});

describe(":::NJSCPJLEPF_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPJLEPF_TEST_5:::An Object should be exported with specified values from the file 'exportObject.js'", () => {
    expect(person).toEqual({ firstName: "John", lastName: "Wilson" });
  });
});
