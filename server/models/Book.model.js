const { Schema, model } = require("mongoose");

const bookSchema = new Schema({

    bookId: {
        type: String,
        // required: true
    }, 

    fragments: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragment'
    }],

    name: String

}, {
  timestamps: true
});

const Book = model("Book", bookSchema);

module.exports = Book;
