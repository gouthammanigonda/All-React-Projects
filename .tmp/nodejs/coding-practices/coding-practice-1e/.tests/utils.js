export function getTotalNamedImports(babelObject) {
  let count = 0;
  babelObject.program.body.map((eachObject) =>
    eachObject.specifiers !== undefined && eachObject.specifiers.length !== 0
      ? eachObject.specifiers.map((eachObject) =>
          eachObject.type === "ImportSpecifier" ? count++ : null
        )
      : null
  );
  return count;
}

export function getTotalDefaultImports(babelObject) {
  return babelObject.program.body.filter((eachObject) =>
    eachObject.specifiers !== undefined && eachObject.specifiers.length !== 0
      ? eachObject.specifiers[0].type === "ImportDefaultSpecifier"
      : false
  ).length;
}

export function getTotalNamedExports(babelObject) {
  return babelObject.program.body.filter(
    (eachObject) => eachObject.type === "ExportNamedDeclaration"
  ).length;
}

export function getTotalDefaultExports(babelObject) {
  return babelObject.program.body.filter(
    (eachObject) => eachObject.type === "ExportDefaultDeclaration"
  ).length;
}

function importStatementObject(valueName, path) {
  return {
    valueName,
    path,
  };
}

export function getListOfTotalNamedImports(babelObject) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.specifiers !== undefined &&
    eachStatement.specifiers.length !== 0
      ? eachStatement.specifiers.map((eachObject) =>
          eachObject.type === "ImportSpecifier"
            ? statementsList.push(
                importStatementObject(
                  eachObject.imported.name,
                  eachStatement.source.value
                )
              )
            : null
        )
      : null
  );
  return statementsList.length ? statementsList : null;
}

export function getListOfTotalDefaultImports(babelObject) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.specifiers !== undefined &&
    eachStatement.specifiers.length !== 0
      ? eachStatement.specifiers[0].type === "ImportDefaultSpecifier"
        ? statementsList.push(
            importStatementObject(
              eachStatement.specifiers[0].local.name,
              eachStatement.source.value
            )
          )
        : null
      : null
  );
  return statementsList.length ? statementsList : null;
}

export function getListOfTotalNamedExports(babelObject) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.type === "ExportNamedDeclaration"
      ? statementsList.push(
          eachStatement.declaration !== null
            ? eachStatement.declaration.id !== undefined
              ? eachStatement.declaration.id.name
              : eachStatement.declaration.declarations[0].id.name
            : eachStatement.specifiers.forEach((eachObject) =>
                statementsList.push(eachObject.local.name)
              )
        )
      : null
  );
  return statementsList.length
    ? statementsList[statementsList.length - 1] === undefined
      ? (() => {
          statementsList.pop();
          return statementsList;
        })()
      : statementsList
    : null;
}

export function getListOfTotalDefaultExports(babelObject) {
  const statementsList = [];
  babelObject.program.body.map((eachStatement) =>
    eachStatement.type === "ExportDefaultDeclaration"
      ? statementsList.push(
          eachStatement.declaration.name !== undefined
            ? eachStatement.declaration.name
            : eachStatement.declaration.value !== undefined
            ? eachStatement.declaration.value
            : eachStatement.declaration.properties !== undefined
            ? eachStatement.declaration.properties.forEach((eachObject) =>
                statementsList.push(eachObject.key.name)
              )
            : eachStatement.declaration.id.name
        )
      : null
  );
  return statementsList.length
    ? statementsList[statementsList.length - 1] === undefined
      ? (() => {
          statementsList.pop();
          return statementsList;
        })()
      : statementsList
    : null;
}
