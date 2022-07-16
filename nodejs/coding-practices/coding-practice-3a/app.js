const express = require("express");
const app = express();

const addDays = require("date-fns/addDays");

app.get("/", (request, response) => {
  const newDate = new Date();
  const requiredDate = addDays(newDate, 100);

  const date = requiredDate.getDate();
  const month = requiredDate.getMonth();
  const year = requiredDate.getFullYear();

  response.send(`${date}/${month + 1}/${year}`);
});

app.listen(3000);
module.exports = app;
