// require Express Router()
const router = require("express").Router();

// set the  the  API Routes
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

//  /users endpoint added to the  created for routes for user-routes.js
router.use("/users", userRoutes);
//  /thoughts  endpint added to the created for routes for thought-routes.js
router.use("/thoughts", thoughtRoutes);

// export module Router
module.exports = router;
