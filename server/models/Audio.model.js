const { Schema, model } = require("mongoose");

const audioSchema = new Schema({

  audioFile: {
    type: String,
    required: true
  },

  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book' 
  },

  fragment: {
    type: Schema.Types.ObjectId,
    ref: 'Fragment' 
  },

  rate: {    //Este ratio se basa en la media de todas las puntuaciones de los comentarios 
    type: Number,
    min: 0,
    max: 5
  },

  comments: 
  [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'                       
  }],

  isValidate: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

const Audio = model("Audio", audioSchema);

module.exports = Audio;
