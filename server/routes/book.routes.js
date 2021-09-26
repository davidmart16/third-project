const router = require("express").Router();
const Book = require('../models/Book.model')



router.get("/", (req, res) => {

  Book
    .find()
    .then(books => res.status(200).json(books))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving books", err }))
})

router.get("/:id", (req, res) => {

  const { id } = req.params;
  
  Book
    .findById(id)
    .populate('fragment')
    .populate('bookId')
    .then(book => res.status(200).json({ book, message: "book getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single book", err }))
})

module.exports = router;