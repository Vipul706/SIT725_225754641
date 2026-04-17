const booksService = require('../services/books.service')

const getAllBooks = (req, res) => {
  const data = booksService.getAllBooks()
  res.json(data)
}

const getBookById = (req, res) => {
  const id = req.params.id
  const book = booksService.getBookById(id)

  if (!book) {
    return res.status(404).json({ message: 'Book not found' })
  }

  res.json(book)
}

module.exports = {
  getAllBooks,
  getBookById
}
