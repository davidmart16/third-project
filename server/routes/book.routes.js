const router = require("express").Router();
const Book = require('../models/Book.model')



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

// router.post('/crear-libro', (req,res) => {

//   const {name} = req.body

//   Book
//   .create({name})
//   .then(book => res.status(200).json({book, message: `Book created with this id: ${book.id}`}))
//   .catch(err => res.status(500).json( {code: 500, message: 'Error creating a book', err}))
// })

module.exports = router;