// import momgoose
const { Schema, model } = require("mongoose");

// user schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate or match
      match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{
      // array id values referencing the Thought Model
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }],
    friends: [{
      // Array of _id values referencing the User model (self-reference)
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// virtual to count the number of fronds in the array
UserSchema.virtual('friendCount').get(function(){
  return this.friends.length;
});

// 
const User = model('User', UserSchema);

// export the module
module.exports = User;