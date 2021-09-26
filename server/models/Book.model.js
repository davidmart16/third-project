const { Schema, model } = require("mongoose");

const bookSchema = new Schema({

    bookId: {
        type: Schema.Types.ObjectId
    }, 

    fragment: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragment'
    }]
    

}, {
  timestamps: true
});

const book = model("book", bookSchema);

module.exports = book;
