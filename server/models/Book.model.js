const { Schema, model } = require("mongoose");

const bookSchema = new Schema({

    name: String,

    bookIdApi: {
        type: String,
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
