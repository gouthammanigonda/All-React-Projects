import fs from "fs";
import path from "path";
import { getListOfTotalDefaultImports } from "./utils";
import { fileURLToPath } from "url";
import * as babel from "@babel/parser";

let exportedArray;
let importedArray;

describe(":::NJSCPHDLYL_TEST_SUITE_1:::Tests for Import and Export of an Array using ES6 Module Syntax", () => {
  let importFileBabelObject;
  let exportFileBabelObject;
  let importFile;
  let exportFile;
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  beforeAll(() => {
    try {
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportArray.mjs"),
        "utf-8"
      );
      import("../exportArray.mjs").then(
        (myArray) => (exportedArray = myArray.default)
      );
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}

    try {
      import("../importArray.mjs").then((myArray) => (importedArray = myArray));
      importFile = fs.readFileSync(
        path.join(__dirname, "../importArray.mjs"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPHDLYL_TEST_1:::A file should be created with the name 'exportArray.mjs'", () => {
    const absolutePath = path.join(__dirname, "../exportArray.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPHDLYL_TEST_2:::A file should be created with the name 'importArray.mjs'", () => {
    const absolutePath = path.join(__dirname, "../importArray.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPHDLYL_TEST_3:::An array should be imported in the file 'importArray.mjs' with default import using the ES6 module syntax", () => {
    expect(importFile.match(/import/gm)[0]).toBe("import");
    expect(
      getListOfTotalDefaultImports(importFileBabelObject)[0].path.match(
        /\.\/exportArray.mjs/
      )[0]
    ).toBe("./exportArray.mjs");
  });
});

describe(":::NJSCPHDLYL_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPHDLYL_TEST_4:::An Array with a specified values should be exported from the 'exportArray.mjs' file", () => {
    expect(exportedArray).toEqual([
      "countries",
      190,
      "continents",
      7,
      false,
      6.2,
    ]);
  });
});
