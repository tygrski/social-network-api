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

  // udpadeThought api/thought
  udpadeThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // getThoughtByID api/thought/:id
  getThoughtByID({ params }, res) {
    console.log("Params", params)
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        console.log("ThoughtData", dbThoughtData)
        // if no ID , send 404
        if (!dbThoughtData) {
          res.status(404).json(" No Thought found with this ID");
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // deleteThought api/thought/:id
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(
      { _id: params.thoughtid },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No user with this id " });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.jaon(err));
  },
};

module.exports = thoughtController;
