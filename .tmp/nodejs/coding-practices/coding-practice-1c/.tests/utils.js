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
    eachStatement.declarations[0].id.type === "Identifier"
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
  // console.log(babelObject, "****BabelObject***");
  babelObject.program.body.map((eachStatement) =>
    eachStatement.expression !== undefined &&
    eachStatement.expression.type === "AssignmentExpression"
      ? statementsList.push({
          identifierName:
            eachStatement.expression.left.object.object !== undefined
              ? eachStatement.expression.left.object.object.name
              : eachStatement.expression.left.object.name,
          property: eachStatement.expression.left.property.name,
          //value: eachStatement.expression.right.value,
        })
      : null
  );
  return statementsList.length ? statementsList : null;
};
