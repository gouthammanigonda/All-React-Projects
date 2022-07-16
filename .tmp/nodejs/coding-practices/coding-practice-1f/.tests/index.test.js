import fs from "fs";
import path from "path";
import {
  getListOfTotalDefaultImports,
  getListOfTotalDefaultExports,
} from "./utils";
import { fileURLToPath } from "url";
import * as babel from "@babel/parser";

let exportedNumber;
let importedNumber;

describe(":::NJSCPKSBHE_TEST_SUITE_1:::Tests for Import and Export a Number using ES6 Module Syntax", () => {
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
        path.join(__dirname, "../exportNumber.mjs"),
        "utf-8"
      );
      import("../exportNumber.mjs").then(
        (integer) => (exportedNumber = integer.default)
      );
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}

    try {
      import("../importNumber.mjs").then(
        (integer) => (importedNumber = integer)
      );
      importFile = fs.readFileSync(
        path.join(__dirname, "../importNumber.mjs"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPKSBHE_TEST_1:::A file should be created with the name 'exportNumber.mjs'", () => {
    const absolutePath = path.join(__dirname, "../exportNumber.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPKSBHE_TEST_2:::A file should be created with the name 'importNumber.mjs'", () => {
    const absolutePath = path.join(__dirname, "../importNumber.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPKSBHE_TEST_3:::A Number should be imported in the file 'importNumber.mjs' using the ES6 module syntax", () => {
    expect(importFile.match(/import/gm)[0]).toBe("import");
    expect(
      getListOfTotalDefaultImports(importFileBabelObject)[0].path.match(
        /\.\/exportNumber.mjs/
      )[0]
    ).toBe("./exportNumber.mjs");
  });
});

describe(":::NJSCPKSBHE_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPKSBHE_TEST_4:::The number '25' should be exported from the file 'exportNumber.mjs'", () => {
    expect(exportedNumber).toBe(25);
  });
});
