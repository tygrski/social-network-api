// const { post } = require('.'); 

// require express Router()
const router = require('express').Router();

// Import the functionality and hook it up with the routes
const {
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controlers/user-controller');

//  endpoints for /api/users (GET, POST)
    router 
        .route('/') 
        .get(getAllUser)
        .post(createUser);

// endpont for /api/user/:id (GET, PUT, DELETE)
    router
        .route('/:id')
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser)

// // endpoint for /api/users/friend (POST,DELETE)
//     router
//         .route('/:userId/friends/:friendId')
//         .post(addFriend)
//         .delete(deleteFriend);

 module.exports = router;       