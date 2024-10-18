const { response } = require("express");

const checkIfAdmin = (request, response, next) => {
  if (request.body.isAdmin) {
    request.auth = {
      isAdmin: true,
    };
  } else {
    response.json({
      error: "Not Authorised for this endpoint!",
    });
  }

  next();
};

module.exports = {
  checkIfAdmin,
};
