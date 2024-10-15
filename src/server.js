const express = require("express");

// make an instance of the express system
// So we can configure it
// eg, routes, settings
const app = express();

// GET localhost:3000/
app.get("/", (request, response) => {
  //sends html
  //   response.send("<h1>Hello world!<h1>");

  // sends json
  response.json({
    message: "Hello World!",
  });
});

app.post("/", (request, response) => {
  response.json({
    message: "POST request Received!",
  });
});

app.post("/bananas", (request, response) => {
  response.json({
    message: "POST bananas Received!",
  });
});

const PokemonController = require("./controllers/pokemonController.js");
// localhost:3000/pokemon/
app.use("/pokemon", PokemonController);

module.exports = { app };
