const { Schema, model, Types } = require("mongoose");
const dateFormat = require('../utils/format-date');


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
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
      get: createdAtVal => dateFormat(createdAtVal)
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
});

reactionSchema.virtual('reactionCount').get(function(){
    return this.reaction.length
})

module.exports = Reaction;
