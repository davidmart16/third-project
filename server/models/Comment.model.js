const { Schema, model } = require("mongoose");

const commentSchema = new Schema({

  text: {
    type: String,
    minlength: 2,
    maxlength: 140
  },

  isValidate: {
    type: Boolean,
    default: false
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
