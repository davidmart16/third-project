const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

  text: {
    type: String,
    minlength: 2,
    maxlength: 140
  },

  isValidated: {
    type: Boolean,
    default: false
  },

  rate: {
    type: Number,
    min: 0,
    max: 5
  },
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}, {
  timestamps: true
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
