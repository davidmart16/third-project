const router = require("express").Router();
const Book = require('../models/Book.model')
const Fragment = require("../models/Fragment.model");




router.get("/", (req, res) => {

  Book
    .find()
    .populate('fragments')
    .then(books => res.status(200).json(books))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving books", err }))
})

router.get("/:_id", (req, res) => {

  const { _id } = req.params;
  console.log(_id)

  Book
    .findById(_id)
    //.populate('fragment')
    //.populate('bookId')
    .then(book => res.status(200).json({ book, message: "book getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single book", err }))
})


router.post("/create", (req, res) => {
  
  const { content, bookId } = req.body
  
  Book.findOne({ id: bookId })
  .then(book => {
    if (book) {
      return book;
    } else {
      return Book.create({ bookId })
    }
  })
  .then(book => Fragment.create( {content, bookId: book._id } ))
  .then(fragment => Book.findByIdAndUpdate(fragment.bookId, {$push: {fragments: fragment.id}}, {new: true}))
  .then(() => res.status(200).json({message: 'Fragment created in the book'}))
  .catch((err) => console.log(err));
})

// router.post('/create/:id', (req,res) => {
    //const { id } = req.params
//   const {name} = req.body

//   Book
//   .create({name})
//   .then(book => res.status(200).json({book, message: `Book created with this id: ${book.id}`}))
//   .catch(err => res.status(500).json( {code: 500, message: 'Error creating a book', err}))
// })

module.exports = router;