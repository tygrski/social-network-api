const { Schema, model } = require("mongoose");
const dateFormat = require('../utils/dateFormat');
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema({

    thoughText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema],
},
    {
        toJSON: {
        virtuals: true,
        getters: true
        },
        id: false,
    }
);


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;