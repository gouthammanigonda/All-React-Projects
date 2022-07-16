const fs = require("fs");
const path = require("path");
const {
  getListOfTotalExports,
  getListOfTotalIdentifiers,
  getListOfFunctionCalls,
  getListOfTotalFunctions,
} = require("./utils");
const babel = require("@babel/parser");

let moduleFile;
let ratioAndFactorial;
let moduleFileBabelObject;
describe(":::NJSCPUETHL_TEST_SUITE_1:::Tests for Calculate Ratio and Factorial", () => {
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };

  beforeAll(() => {
    try {
      moduleFile = fs.readFileSync(
        path.join(__dirname, "../utilities") + "/ratioFactorial/index.js",
        "utf-8"
      );
      ratioAndFactorial = require("../utilities/ratioFactorial/index.js");
      moduleFileBabelObject = babel.parse(moduleFile, configuration);
    } catch (error) {
      console.log(error, "error");
    }
  });

  it(":::NJSCPUETHL_TEST_1:::A file should be created with the name 'index.js' in 'ratioFactorial' directory", () => {
    const absolutePath = path.join(
      __dirname,
      "../utilities/ratioFactorial/index.js"
    );
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPUETHL_TEST_2:::A Function with name 'ratioAndFactorial' should be exported from the file 'index.js' of 'ratioFactorial' directory using the default export method", () => {
    const functions = getListOfTotalFunctions(moduleFileBabelObject);
    expect(getListOfTotalExports(moduleFileBabelObject)[0].identifierName).toBe(
      "module"
    );
    expect(
      functions !== null
        ? functions.some((eachName) => eachName === "ratioAndFactorial")
        : false
    ).toBe(true);
  });
});

it(":::NJSCPUETHL_TEST_3:::Two functions should be imported from the 'index.js' files from 'factorial' and 'ratio' directories", () => {
  const result = getListOfTotalIdentifiers(moduleFileBabelObject);
  expect(
    result.filter(
      (eachResult) =>
        (eachResult.module.match(/\.\.\/ratio/g) !== null ||
          eachResult.module.match(/\.\.\/factorial/g) !== null) &&
        eachResult.method === "require"
    ).length
  ).toBe(2);
});

it(":::NJSCPUETHL_TEST_4:::The ratio and factorial should be obtained by using the imported functions", () => {
  const result = getListOfFunctionCalls(moduleFileBabelObject);
  const totalIdentifiers = getListOfTotalIdentifiers(moduleFileBabelObject);
  const importedFunctions = totalIdentifiers.filter((eachIdentifier) => {
    if (eachIdentifier.module !== undefined) {
      return (
        eachIdentifier.module.match(/\.\.\/ratio/g) ||
        eachIdentifier.module.match(/\.\.\/factorial/g)
      );
    }
  });

  expect(
    result.every((eachName) =>
      importedFunctions.some((eachObject) => eachObject.name === eachName)
    )
  ).toBe(true);
});

describe(":::NJSCPUETHL_TEST_SUITE_2:::Tests for Calculate Ratio and Factorial", () => {
  it(":::NJSCPUETHL_TEST_5:::The function exported from the file 'index.js' of ratioFactorial should return the ratio of the first two numbers and factorial of the third number in an object", () => {
    expect(ratioAndFactorial(5, 2, 4)).toEqual({ ratio: 2.5, factorial: 24 });
  });
});
