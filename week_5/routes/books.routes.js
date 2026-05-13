const express = require('express')
const router = express.Router()
const booksController = require('../controller/books.controller')

router.get('/api/books', booksController.getAllBooks)
router.get('/api/books/:id', booksController.getBookById)
router.post('/api/books', booksController.createBook)
router.put('/api/books/:id', booksController.updateBook)

router.get('/api/integrity-check42', (req, res) => {
  res.status(204).send()
})

module.exports = router
