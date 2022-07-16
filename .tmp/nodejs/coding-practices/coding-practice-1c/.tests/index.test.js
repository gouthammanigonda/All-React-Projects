const fs = require("fs");
const path = require("path");
const { getListOfTotalExports, getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

let importFile;
let exportFile;
let square;

describe(":::NJSCPIJTND_TEST_SUITE_1:::Tests for Import and Export of a Function with Parameter using Common JS Module Syntax", () => {
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
        path.join(__dirname, "../importFunctionWithParameter.js"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}

    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportFunctionWithParameter.js"),
        "utf-8"
      );
      square = require("../exportFunctionWithParameter.js");
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPIJTND_TEST_1:::A file should be created with the name 'exportFunctionWithParameter.js'", () => {
    const absolutePath = path.join(
      __dirname,
      "../exportFunctionWithParameter.js"
    );
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPIJTND_TEST_2:::A file should be created with the name 'importFunctionWithParameter.js'", () => {
    const absolutePath = path.join(
      __dirname,
      "../importFunctionWithParameter.js"
    );
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPIJTND_TEST_3:::A Function should be exported from the file 'exportFunctionWithParameter.js' as default using the common JS module syntax", () => {
    expect(getListOfTotalExports(exportFileBabelObject)[0].identifierName).toBe(
      "module"
    );
  });

  it(":::NJSCPIJTND_TEST_4:::A Function should be imported in the file 'importFunctionWithParameter.js' using the common JS module syntax", () => {
    const resultObject = getListOfTotalIdentifiers(importFileBabelObject)[0];
    expect(
      resultObject.module.match(/\.\/exportFunctionWithParameter/g) &&
        resultObject.method === "require"
    ).toBe(true);
  });
});

describe(":::NJSCPIJTND_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPIJTND_TEST_5:::The exported function should accept a number and return its square", () => {
    expect(square(7)).toBe(49);
  });
});
