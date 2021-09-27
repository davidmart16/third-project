const { Schema, model } = require("mongoose");

const bookSchema = new Schema({

    bookId: {
        type: String,
        // required: true
    }, 

    fragment: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragment'
    }],

    name: String

}, {
  timestamps: true
});

const book = model("book", bookSchema);

module.exports = book;
