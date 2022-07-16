const fs = require("fs");
const path = require("path");
const { getListOfTotalExports, getListOfTotalIdentifiers } = require("./utils");
const babel = require("@babel/parser");

let messageFile;
let message;

jest.mock("../greeting/index.js", () => `Mock Text`);

describe(":::NJSCPLSNFE_TEST_SUITE_1:::Tests for Greeting Message", () => {
  const configuration = {
    allowImportExportEverywhere: true,
    allowAwaitOutsideFunction: true,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    sourceType: "unambiguous",
    strictMode: true,
  };
  let messageFileBabelObject;

  beforeAll(() => {
    try {
      messageFile = fs.readFileSync(
        path.join(__dirname, "../message") + "/index.js",
        "utf-8"
      );
      message = require("../message/index.js");
      messageFileBabelObject = babel.parse(messageFile, configuration);
    } catch (error) {}
  });

  it(":::NJSCPLSNFE_TEST_1:::A JavaScript file should be created with the name 'index' in the 'message' directory", () => {
    const absolutePath = path.join(__dirname, "../message") + "/index.js";
    const isFilePresent = fs.existsSync(absolutePath);
    if (isFilePresent) {
    } else {
      expect(true).toBe(false);
    }
  });

  it(":::NJSCPLSNFE_TEST_2:::A String should be imported from the file 'index.js' of the 'greeting' directory to the 'index.js' file of the 'message' directory", () => {
    const resultObject = getListOfTotalIdentifiers(messageFileBabelObject)[0];

    expect(
      resultObject.module.match(/\.\.\/greeting/g) &&
        resultObject.method === "require"
    ).toBe(true);
  });

  it(":::NJSCPLSNFE_TEST_3:::A String should be exported from the file 'index.js' of the 'message' directory using the default export syntax", () => {
    expect(
      getListOfTotalExports(messageFileBabelObject)[0].identifierName
    ).toBe("module");
  });
});

describe(":::NJSCPLSNFE_TEST_SUITE_2:::Tests for Greeting Message", () => {
  it(":::NJSCPLSNFE_TEST_4:::A String with the specified text should be exported from the file 'index.js' of the 'message' directory", () => {
    expect(message).toBe("Hello Rahul! Mock Text");
  });
});
