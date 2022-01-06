const { User, Thought } = require("../models");
const { db } = require("../models/User");

const thoughtController = {
  // get all thought
  getAllThought(res, req) {
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
      .then(( res ) => {
        console.log("PARAMS",params)
        console.log("ID",id)
        console.log("RES", res)
        return User.findOneAndUpdate(
          { id: params.userId },
          { $push: { thoughts: id } },
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
  udpadeThought({ params, body }, res) {
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
    getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // deleteThought api/thought/:id
  deleteThought({ params}, res) {
    Thought.findByIdAndDelete({_id: params.thoughtid }, { new:true, runValidators: true })
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({ message: 'No user with this id '})
        return;
      }
      res.json(dbThoughtData);
    }) 
    .catch(err => res.jaon(err))
  }

};

module.exports = thoughtController;
