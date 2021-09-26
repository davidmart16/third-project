const { Schema, model } = require("mongoose");

const fragmentSchema = new Schema({

  content: {
    type: String,
    minlength: 2,
    require: true
  },

  bookId: {
    type: Schema.Types.ObjectId,   
    ref: 'Book'                       
  },

  audios: 
  [{
      type: Schema.Types.ObjectId,   
      ref: 'Audio'                       //SE PONE DEFAULT: [] PARA UNA ARRAY VACIA?
  }],

  isValidate: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

const Fragment = model("Fragment", fragmentSchema);

module.exports = Fragment;
