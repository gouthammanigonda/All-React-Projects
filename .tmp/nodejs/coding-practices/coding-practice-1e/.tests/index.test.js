import fs from "fs";
import path from "path";
import {
  getListOfTotalNamedImports,
  getListOfTotalNamedExports,
} from "./utils";
import { fileURLToPath } from "url";
import * as babel from "@babel/parser";

let exportedFunction;
let exportedObject;
let exportedArray;

describe(":::NJSCPJSLOB_TEST_SUITE_1:::Tests for Import and Export Multiple Values using ES6 Module Syntax", () => {
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
      import("../exportMultipleValues.mjs").then((allExports) => {
        exportedFunction = allExports.multiplyByFour;
        exportedObject = allExports.bulb;
        exportedArray = allExports.myArray;
      });
      exportFile = fs.readFileSync(
        path.join(__dirname, "../exportMultipleValues.mjs"),
        "utf-8"
      );
      exportFileBabelObject = babel.parse(exportFile, configuration);
    } catch (error) {}
    try {
      importFile = fs.readFileSync(
        path.join(__dirname, "../importMultipleValues.mjs"),
        "utf-8"
      );
      importFileBabelObject = babel.parse(importFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPJSLOB_TEST_1:::A file should be created with the name 'exportMultipleValues.mjs'", () => {
    const absolutePath = path.join(__dirname, "../exportMultipleValues.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPJSLOB_TEST_2:::A file should be created with the name importMultipleValues.mjs'", () => {
    const absolutePath = path.join(__dirname, "../importMultipleValues.mjs");
    const isFilePresent = fs.existsSync(absolutePath);
    expect(isFilePresent).toBe(true);
  });

  it(":::NJSCPJSLOB_TEST_3:::The values exported from the file 'exportMultipleValues.mjs' should be imported in the file 'importMultipleValues.mjs' using the ES6 module syntax", () => {
    expect(importFile.match(/import/gm)[0]).toBe("import");
    expect(
      getListOfTotalNamedImports(importFileBabelObject)[0].path.match(
        /\.\/exportMultipleValues.mjs/
      )[0]
    ).toBe("./exportMultipleValues.mjs");
  });

  it(":::NJSCPJSLOB_TEST_4:::Three values should be exported from the file 'exportMultipleValues.mjs' as 'myArray', 'bulb', and 'multiplyByFour' using the named export syntax", () => {
    const userVariablesList = getListOfTotalNamedExports(exportFileBabelObject);
    const expectedVariablesList = ["myArray", "bulb", "multiplyByFour"];
    expect(
      expectedVariablesList.every((eachVariable) =>
        userVariablesList.includes(eachVariable)
      )
    ).toBe(true);
  });

  it(":::NJSCPJSLOB_TEST_5:::Three values should be imported in the file 'importMultipleValues.mjs' as 'myArray', 'bulb', and 'multiplyByFour' using the named export syntax", () => {
    const userVariablesList = getListOfTotalNamedImports(
      importFileBabelObject
    ).map((eachObject) => eachObject.valueName);
    const expectedVariablesList = ["myArray", "bulb", "multiplyByFour"];
    expect(
      expectedVariablesList.every((eachVariable) =>
        userVariablesList.includes(eachVariable)
      )
    ).toBe(true);
  });
});

describe(":::NJSCPJSLOB_TEST_SUITE_2:::should test the export and import values", () => {
  it(":::NJSCPJSLOB_TEST_6:::The object 'bulb' with specified properties should be exported from the file 'exportMultipleValues.mjs'", () => {
    expect(exportedObject).toEqual({
      watts: 10,
      type: "LED",
    });
  });

  it(":::NJSCPJSLOB_TEST_7:::The array 'myArray' with specified values should be exported from the file 'exportMultipleValues.mjs'", () => {
    expect(exportedArray).toEqual(["camel", 265, true, "5.6"]);
  });

  it(":::NJSCPJSLOB_TEST_8:::The function 'multiplyByFour' should accept a number and return the value multiplied by four", () => {
    expect(exportedFunction(5)).toBe(20);
  });
});
