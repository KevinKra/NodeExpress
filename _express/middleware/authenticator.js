function authenticator(req, res, next) {
  console.log("authenticating...");
  next();
}

module.exports = authenticator;
