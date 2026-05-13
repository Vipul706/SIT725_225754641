const booksService = require('../services/books.service')

const allowedFields = [
  'id',
  'title',
  'author',
  'year',
  'genre',
  'summary',
  'price'
]

const findExtraFields = body => {
  const keys = Object.keys(body)
  const extraFields = keys.filter(key => !allowedFields.includes(key))
  return extraFields
}

const getAllBooks = async (req, res) => {
  try {
    const books = await booksService.getAllBooks()
    res.json(books)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getBookById = async (req, res) => {
  try {
    const id = req.params.id
    const book = await booksService.getBookById(id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createBook = async (req, res) => {
  try {
    const extraFields = findExtraFields(req.body)

    if (extraFields.length > 0) {
      return res.status(400).json({
        message: 'Unexpected fields are not allowed',
        extraFields: extraFields
      })
    }

    const createdBook = await booksService.createBook(req.body)
    res.status(201).json(createdBook)
  } catch (error) {
    console.log(error)

    if (error.status === 409 || error.code === 11000) {
      return res.status(409).json({ message: 'Duplicate id' })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      })
    }

    res.status(500).json({ message: 'Internal server error' })
  }
}

const updateBook = async (req, res) => {
  try {
    const extraFields = findExtraFields(req.body)

    if (extraFields.length > 0) {
      return res.status(400).json({
        message: 'Unexpected fields are not allowed',
        extraFields: extraFields
      })
    }

    const updatedBook = await booksService.updateBook(req.params.id, req.body)
    res.status(200).json(updatedBook)
  } catch (error) {
    console.log(error)

    if (error.status === 404) {
      return res.status(404).json({ message: 'Book not found' })
    }

    if (error.status === 400) {
      return res.status(400).json({ message: error.message })
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: Object.values(error.errors).map(e => e.message)
      })
    }

    res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
}
