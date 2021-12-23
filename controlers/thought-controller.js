const { User, Thought } = require("../models");

const thoughtController = {
  // get all thought
  getAllThougt(res, req) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //  createThought api/thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
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
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtid }, body, {
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
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = thoughtController;
