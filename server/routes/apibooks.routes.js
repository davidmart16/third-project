
const router = require('express').Router()

const APIHandler = require('../services/APIHandler')

const API = new APIHandler()

router.get('/search-book/:text', (req, res) => {

    const {text} = req.params
    console.log(text)

    API
    .getBooks(text)
    .then(books => {
        console.log(books, 'HOLAAAAA ESTOY AQUIIIIIIIII',books.data)    
        return res.json( books.data.items)
    })
    .catch(err => console.error(err))
})

router.get("/search-book-by/:type/:text", (req, res) => {

  const { type, text } = req.params
  if (text.length === 0) text = ""

  const types = {
    category: API.getBooksByCategory,
    title: API.getBooksByTitle,
    author: API.getBooksByAuthor,
    isbn: API.getBooksByISBN,
  }

  types[type](text)
    .then((books) => res.json(books.data.items))
    .catch(err => console.error(err))

})

router.get('/get-book/:id', (req, res) => {

    const { id } = req.params

    API
    .getBooks(id)
    .then(book => res.json(book.data.items))
    .catch(err => console.error(err))
    
})

module.exports = router;
