//  Integrate API Routes into the Server
// Exported to use in server.js


// Require express Router()
const router = require("express").Router();

// Imports API routes
const apiRoutes = require("./api");

//      /api added  to all api 
router.use("/api", apiRoutes);

// error message
router.use((req, res) => {
  res.status(404).send("<h1>😝 404 Error!</h1>");
});

// export the router
module.exports = router;
