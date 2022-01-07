const req = require("express/lib/request");
const { User, Thought } = require("../models");
const { db } = require("../models/User");

const thoughtController = {
  // get all thought
  getAllThought(req, res) {
    Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //  createThought api/thought
  createThought({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { thoughts: body } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Need more thought info" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  

  // getThoughtByID api/thought/:id
  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
};

module.exports = thoughtController;
