const express = require("express");
const { checkIfAdmin } = require("../middleware/userMiddleware");
const { getUsersFromDatabaser } = require("../middleware/databaseMiddleware");
const router = express.Router();

// get all users
// but only if the admin is the one making this request
// localhost:3000/users/
router.post(
  "/",
  checkIfAdmin, // middleware to check auth
  getUsersFromDatabaser, // middleware tp query the database
  (request, response) => {
    response.json({
      users: request.userData, // use the middleware results in the endpoint response
    });
  }
);

module.exports = router;
