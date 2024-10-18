const express = require("express");

// make an instance of the express system
// So we can configure it
// eg, routes, settings
const app = express();

// configure the app instance for whatever we need
app.use(express.json());

// and then set up the routes
// GET localhost:3000/

/*
instance.verb(routePath, 
  middleware,
  middleware,
  middleware,
  middleware,
  route handler)
*/

function middleware(request, response, next) {
  console.log("Testing middle is now running!");
  request.customData = {
    ...request.customData,
    middleware: "Test Test",
  };
  request.customData.middleware = "testing middleware";
  next();
}

app.get(
  "/",
  // middleware function goes here
  middleware,

  (request, response) => {
    //sends html
    //   response.send("<h1>Hello world!<h1>");

    // sends json
    response.json({
      message: "Hello World!",
      customStuff: request.customData,
    });
  }
);

app.post("/", middleware, (request, response) => {
  response.json({
    message: "POST request Received!",
  });
});

app.post(
  "/bananas",
  (request, response, next) => {
    console.log("bananas route has run");
    next();
  },
  (request, response) => {
    response.json({
      message: "POST bananas Received!",
    });
  }
);

const PokemonController = require("./controllers/pokemonController.js");
// localhost:3000/pokemon/
app.use("/pokemon", PokemonController);

const UserController = require("./controllers/userController.js");
app.use("/Users", UserController);

module.exports = { app };
