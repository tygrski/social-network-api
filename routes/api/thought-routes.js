const router = require('express').Router();

const {
    getAllThought,
    createThought,
    udpadeThought,
    getThoughtByID,
    deleteThought,
    // createReation,
    // deleteReaction
} = require ('../../controlers/thought-controller');

// endpoint for api/thoughts(Get)
router
    .route('/')
    .get(getAllThought)

// end point for /thoughts/User-id(post)
router
    .route('/:id')
    .post(createThought)

// endpoint for thougnt ids  /api/thoughtId(get, put , delete)
router
    .route(':thoughtId')
    .get(getThoughtByID)
    .put(udpadeThought)
    .delete(deleteThought)



module.exports = router;
