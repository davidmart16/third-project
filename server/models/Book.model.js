const { Schema, model } = require("mongoose");

const bookSchema = new Schema({

    name: String,

    bookId: {
        type: String,
        // required: true
    }, 

    fragments: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragment'
    }]

}, {
  timestamps: true
});

const Book = model("Book", bookSchema);

module.exports = Book;
