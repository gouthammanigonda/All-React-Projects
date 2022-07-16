import fs from "fs";
import path from "path";
import {
  getListOfTotalDefaultImports,
  getListOfTotalDefaultExports,
} from "./utils";
import { fileURLToPath } from "url";
import * as babel from "@babel/parser";

let exportedString;
let importedString;

describe(":::NJSCPLOAWC_TEST_SUITE_1:::Tests for Import and Export a String using ES6 Module Syntax", () => {
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
        path.join(__dirname, "../exportString.mjs"),
        "utf-8"
      );
      import("../exportString.mjs").then(
        (message) => (exportedString = message.default)
      );
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}

    try {
      import("../importString.mjs").then(
        (message) => (importedString = message)
      );
      importFile = fs.readFileSync(
        path.join(__dirname, "../importString.mjs"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPLOAWC_TEST_1:::A file should be created with the name 'exportString.mjs'", () => {
    const absolutePath = path.join(__dirname, "../exportString.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPLOAWC_TEST_2:::A file should be created with the name 'importString.mjs'", () => {
    const absolutePath = path.join(__dirname, "../importString.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPLOAWC_TEST_3:::A String should be imported in the file 'importString.mjs' as default using the ES6 module syntax", () => {
    expect(importFile.match(/import/gm)[0]).toBe("import");
    expect(
      getListOfTotalDefaultImports(importFileBabelObject)[0].path.match(
        /\.\/exportString.mjs/
      )[0]
    ).toBe("./exportString.mjs");
  });
});

describe(":::NJSCPLOAWC_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPLOAWC_TEST_4:::A String with a specified text should be exported from the file 'exportString.mjs'", () => {
    expect(exportedString).toBe("Be Happy and Safe");
  });
});
