exports.getListOfTotalObjectPatterns = function getListOfTotalObjectPatterns(
  babelObject
) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.declarations !== undefined &&
    eachStatement.declarations.length !== 0 &&
    eachStatement.declarations[0].id.type === "ObjectPattern"
      ? eachStatement.declarations[0].properties.map((eachProperty) =>
          statementsList.push({
            name: eachProperty.key.name,
            method: eachStatement.declarations[0].init.callee.name,
            module: eachStatement.declarations[0].init.arguments[0].value,
          })
        )
      : null
  );
  return statementsList.length ? statementsList : null;
};

exports.getListOfTotalIdentifiers = function getListOfTotalIdentifiers(
  babelObject
) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.declarations !== undefined &&
    eachStatement.declarations.length !== 0 &&
    eachStatement.declarations[0].id.type === "Identifier" &&
    eachStatement.declarations[0].init.type !== "ArrowFunctionExpression" &&
    eachStatement.declarations[0].init.type !== "FunctionExpression"
      ? statementsList.push({
          name: eachStatement.declarations[0].id.name,
          method: eachStatement.declarations[0].init.callee.name,
          module: eachStatement.declarations[0].init.arguments[0].value,
        })
      : null
  );
  return statementsList.length ? statementsList : null;
};

exports.getListOfTotalExports = function getListOfTotalExports(babelObject) {
  const statementsList = [];

  babelObject.program.body.map((eachStatement) =>
    eachStatement.expression !== undefined &&
    eachStatement.expression.type === "AssignmentExpression"
      ? statementsList.push({
          identifierName:
            eachStatement.expression.left.object.object !== undefined
              ? eachStatement.expression.left.object.object.name
              : eachStatement.expression.left.object.name,
          property: eachStatement.expression.left.property.name,
        })
      : null
  );
  return statementsList.length ? statementsList : null;
};

exports.getListOfFunctionCalls = function getListOfFunctionCalls(babelObject) {
  const statementsList = [];
  const functionCalleeNames = (bodyObject) => {
    if (bodyObject.type === "CallExpression") {
      statementsList.push(bodyObject.callee.name);
    } else {
      bodyObject.body[0].type === "ReturnStatement" &&
      bodyObject.body[0].argument.properties !== undefined
        ? bodyObject.body[0].argument.properties.forEach((eachProperty) =>
            statementsList.push(eachProperty.value.callee.name)
          )
        : bodyObject.body[0].type === "ReturnStatement"
        ? statementsList.push(bodyObject.body[0].argument.callee.name)
        : bodyObject.body[0].declarations[0].init.callee !== undefined
        ? bodyObject.body[0].declarations[0].init.callee.name !== undefined
          ? statementsList.push(
              bodyObject.body[0].declarations[0].init.callee.name
            )
          : null
        : bodyObject.body[0].declarations[0].init.type === "ObjectExpression"
        ? bodyObject.body[0].declarations[0].init.properties.forEach(
            (eachProperty) =>
              statementsList.push(eachProperty.value.callee.name)
          )
        : null;
    }
  };
  babelObject.program.body.map((eachStatement) =>
    eachStatement.type === "VariableDeclaration"
      ? eachStatement.declarations[0].init.type === "ArrowFunctionExpression" ||
        eachStatement.declarations[0].init.type === "FunctionExpression"
        ? functionCalleeNames(eachStatement.declarations[0].init.body)
        : null
      : eachStatement.type === "FunctionDeclaration"
      ? functionCalleeNames(eachStatement.body)
      : eachStatement.type === "ExpressionStatement" &&
        eachStatement.expression.type === "AssignmentExpression" &&
        eachStatement.expression.right.type === "FunctionExpression"
      ? functionCalleeNames(eachStatement.expression.right.body)
      : null
  );
  return statementsList.length ? statementsList : null;
};

exports.getListOfTotalFunctions = function getListOfTotalFunctions(
  babelObject
) {
  const statementsList = [];

  babelObject.program.body.map((eachStatement) =>
    eachStatement.type === "FunctionDeclaration"
      ? statementsList.push(eachStatement.id.name)
      : eachStatement.type === "VariableDeclaration"
      ? eachStatement.declarations[0].init.type === "ArrowFunctionExpression" ||
        eachStatement.declarations[0].init.type === "FunctionExpression"
        ? statementsList.push(eachStatement.declarations[0].id.name)
        : null
      : eachStatement.type === "ExpressionStatement" &&
        eachStatement.expression.type === "AssignmentExpression" &&
        eachStatement.expression.right.type === "FunctionExpression"
      ? statementsList.push(eachStatement.expression.right.id.name)
      : null
  );
  return statementsList.length ? statementsList : null;
};
