const express = require("express");

const {
  getOrCreatePokemonNumber,
  getPokeApiData,
  trimPokeApiData,
} = require("../middleware/pokeApiMiddleware.js");

// Create an instance of just a router, not a full server
const router = express.Router();

router.get("/", (request, response) => {
  response.json({
    message: "Pokemon routes live here!",
  });
});

// Pokemon API request
// localhost:3000/pokemon/random
router.get("/random", async (request, response) => {
  let pokemonData = {};

  let randomNumber = Math.floor(Math.random() * 1025) + 1;
  let responseData = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + randomNumber
  );
  pokemonData = await responseData.json();

  response.json({
    result: pokemonData,
  });
});

router.get(
  "/randommiddleware",
  // middleware goes here
  getOrCreatePokemonNumber,
  getPokeApiData,
  trimPokeApiData,

  // middleware is finished by here
  (request, response) => {
    response.json({
      result: "todo",
    });
  }
);

// Export the router for the app to use
// since we must tell the app instance to load up routers
module.exports = router;
