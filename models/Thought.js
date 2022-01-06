const { Schema, model, Types } = require("mongoose");
//  import JS date-format file for  get: createdAtVal => dateFormat(createdAtVal)

const dateFormat = require("../utils/format-date");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    // sub document
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true
    },
    id: false,
  }
);

//  virtual to count the  total number of reactions in the array
reactionSchema.virtual("reactionCount").get(function () {
  return this.reaction.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = { ThoughtSchema, Thought };
