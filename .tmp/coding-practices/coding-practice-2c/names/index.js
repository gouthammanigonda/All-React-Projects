let countrySourceList = require("../country/state/city/index");
let utility = require("../utilities/utils/index");

function getPeopleInCity(countrySourceList) {
  return utility(countrySourceList);
}

module.exports = getPeopleInCity;
