const booksService = require('../services/books.service')

const getAllBooks = async (req, res) => {
  const data = await booksService.getAllBooks()
  res.json(data)
}

const getBookById = async (req, res) => {
  const id = req.params.id
  const book = await booksService.getBookById(id)

  if (!book) {
    return res.status(404).json({ message: 'Book not found' })
  }

  res.json(book)
}

module.exports = {
  getAllBooks,
  getBookById
}
