const fs = require("fs");
const path = require("path");
const {
  getListOfTotalExports,
  getListOfTotalIdentifiers,
  getListOfFunctionCalls,
  getListOfTotalFunctions,
} = require("./utils");
const babel = require("@babel/parser");

let namesFile;
let names;

describe(":::NJSCPUSJFR_TEST_SUITE_1:::Tests for First Names of People", () => {
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  let namesFileBabelObject;

  beforeAll(() => {
    try {
      namesFile = fs.readFileSync(
        path.join(__dirname, "../names") + "/index.js",
        "utf-8"
      );
      names = require("../names/index.js");
      namesFileBabelObject = babel.parse(namesFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPUSJFR_TEST_1:::A file should be created in 'name' directory as 'index.js'", () => {
    const absolutePath = path.join(__dirname, "../names") + "/index.js";
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPUSJFR_TEST_2:::A Function with name 'getPeopleInCity' should be exported from the file 'index.js' of 'names' directory", () => {
    const functions = getListOfTotalFunctions(namesFileBabelObject);

    expect(getListOfTotalExports(namesFileBabelObject)[0].identifierName).toBe(
      "module"
    );

    expect(
      functions !== null
        ? functions.some((eachName) => eachName === "getPeopleInCity")
        : false
    ).toBe(true);
  });

  it(":::NJSCPUSJFR_TEST_3:::The people names and utility function should be imported in the 'index.js' of 'names' directory", () => {
    const result = getListOfTotalIdentifiers(namesFileBabelObject);
    expect(
      result.filter(
        (eachResult) =>
          (eachResult.module.match(/\.\.\/country\/state\/city/g) !== null ||
            eachResult.module.match(/\.\.\/utilities\/utils/g) !== null) &&
          eachResult.method === "require"
      ).length
    ).toBe(2);
  });
  it(":::NJSCPUSJFR_TEST_4:::The first names of the people should be obtained by using the imported utility function", () => {
    const result = getListOfFunctionCalls(namesFileBabelObject);
    const totalIdentifiers = getListOfTotalIdentifiers(namesFileBabelObject);

    expect(
      totalIdentifiers.find((eachIdentifier) => {
        if (eachIdentifier.module !== undefined) {
          return eachIdentifier.module.match(/\.\.\/utilities\/utils/g);
        }
      }).name === result[0]
    ).toBe(true);
  });
});

describe(":::NJSCPUSJFR_TEST_SUITE_2:::Tests for First Names of People", () => {
  it(":::NJSCPUSJFR_TEST_5:::The exported function from the file 'index.js' of 'names' directory should return the first names of the people", () => {
    expect(
      names([
        { firstName: "Chinmaya", lastName: "Korlepara" },
        { firstName: "Pavan", lastName: "Gangireddy" },
        { firstName: "Upender", lastName: "Erigela" },
        { firstName: "Varakumar", lastName: "Jagarapu" },
      ])
    ).toEqual(["Chinmaya", "Pavan", "Upender", "Varakumar"]);
  });
});
