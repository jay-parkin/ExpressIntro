// async because the query will take time
async function getUsersFromDatabaser(request, response, next) {
  request.userData = ["Damian", "Marianne", "Kim", "Brad", "Hayden"];

  next();
}

module.exports = {
  getUsersFromDatabaser,
};
