const { User, Thought } = require('../models');

const thoughtController = {

    //  create thought
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(dbThoughtData => {
            User.findOneAndUpdate(
                {}
            )
        })
    }
};
