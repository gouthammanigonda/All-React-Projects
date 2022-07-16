let express = require("express");
let instance = express();

instance.get("/gadgets", (request, response) => {
  response.sendFile("./gadgets.html", { root: __dirname });
});

instance.listen(3000);
module.exports = instance;
