let factorial = require("../factorial/index");
let ratio = require("../ratio/index");

let ratioAndFactorial = function (a, b, c) {
  let ratioResult = ratio(a, b);
  let factorialResult = factorial(c);

  return { ratioResult, factorialResult };
};

module.exports = ratioAndFactorial;
