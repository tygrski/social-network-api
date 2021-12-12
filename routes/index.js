// Require express Router()
const router = require("express").Router();

// Imports API routes
const apiRoutes = require("./api");

//  prefix `/api` added  to all of the api routes
router.use("/api", apiRoutes);

// error message
router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

// Module exports router
module.exports = router;
