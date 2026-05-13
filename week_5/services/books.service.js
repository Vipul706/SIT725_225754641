const Book = require('../models/book.model')
const mongoose = require('mongoose')

const getAllBooks = async () => {
  const books = await Book.find({})
  return books
}

const getBookById = async id => {
  const book = await Book.findOne({ id: id })
  return book
}

const createBook = async data => {
  const existingBook = await Book.findOne({ id: data.id })

  if (existingBook) {
    const error = new Error('Duplicate id')
    error.status = 409
    throw error
  }

  let priceValue

  try {
    priceValue = mongoose.Types.Decimal128.fromString(String(data.price))
  } catch (e) {
    const error = new Error('Invalid price format')
    error.status = 400
    throw error
  }

  const newBook = new Book({
    id: data.id,
    title: data.title,
    author: data.author,
    year: data.year,
    genre: data.genre,
    summary: data.summary,
    price: priceValue
  })

  const savedBook = await newBook.save()
  return savedBook
}

const updateBook = async (id, data) => {
  const existingBook = await Book.findOne({ id: id })

  if (!existingBook) {
    const error = new Error('Book not found')
    error.status = 404
    throw error
  }

  if (data.id && data.id !== id) {
    const error = new Error('id is immutable and cannot be changed')
    error.status = 400
    throw error
  }

  let priceValue

  try {
    priceValue = mongoose.Types.Decimal128.fromString(String(data.price))
  } catch (e) {
    const error = new Error('Invalid price format')
    error.status = 400
    throw error
  }

  const updatedData = {
    title: data.title,
    author: data.author,
    year: data.year,
    genre: data.genre,
    summary: data.summary,
    price: priceValue
  }

  const updatedBook = await Book.findOneAndUpdate({ id: id }, updatedData, {
    new: true,
    runValidators: true
  })

  return updatedBook
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
}
