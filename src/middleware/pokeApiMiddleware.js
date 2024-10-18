/*
1. retrieve or generate a valid number for pokemon id eg. 25, should be form 1 - 1025
2. getPOkeApiDate - actually making a request to the pokeapi with a number from request.customData
3. trimPokeApiResponse - proces pokeapi response data and keep just a few properties from request
*/

const getOrCreatePokemonNumber = (request, response, next) => {
  let pokemonNumber =
    request.params.pokemonNumber || Math.floor(Math.random() * 1025) + 1;
  console.log(
    "We are gonna retrieve data for the pokemon with ID of " + pokemonNumber
  );

  // How to transfer pokemonNumber from this middleware to other middleware
  request.pokemonStuff = {
    ...request.pokemonStuff, /// ... aka the spread operator helps us keep existing object data
    pokemonNumber,
  };

  next();
};

async function getPokeApiData(request, response, next) {
  let pokemonID = request.pokemonStuff.pokemonNumber;
  console.log("Pokemon ID " + pokemonID);

  let responseData = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemonID
  );

  request.pokemonStuff = {
    ...request.pokemonStuff,
    responseData,
  };

  //   pokemonData = await responseData.json();
  next();
}

async function trimPokeApiData(request, response, next) {
  let validData = await request.pokemonStuff.responseData.json();

  let trimmedData = {
    name: validData.name,
    image: validData.sprites.front_default,
  };

  response.json({
    result: trimmedData,
  });
}

module.exports = {
  getOrCreatePokemonNumber,
  getPokeApiData,
  trimPokeApiData,
};
