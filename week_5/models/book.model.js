const mongoose = require('mongoose')

const currentYear = new Date().getFullYear()

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
    trim: true,
    match: [/^b\d+$/, 'id must look like b1, b2, b3']
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
    minlength: [2, 'title must be at least 2 characters'],
    maxlength: [120, 'title must be at most 120 characters']
  },
  author: {
    type: String,
    required: [true, 'author is required'],
    trim: true,
    minlength: [2, 'author must be at least 2 characters'],
    maxlength: [80, 'author must be at most 80 characters']
  },
  year: {
    type: Number,
    required: [true, 'year is required'],
    min: [1000, 'year must be at least 1000'],
    max: [currentYear, 'year cannot be in the future']
  },
  genre: {
    type: String,
    required: [true, 'genre is required'],
    trim: true,
    minlength: [3, 'genre must be at least 3 characters'],
    maxlength: [40, 'genre must be at most 40 characters']
  },
  summary: {
    type: String,
    required: [true, 'summary is required'],
    trim: true,
    minlength: [10, 'summary must be at least 10 characters'],
    maxlength: [1000, 'summary must be at most 1000 characters']
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'price is required'],
    validate: {
      validator: function (value) {
        const priceValue = parseFloat(value.toString())
        return priceValue > 0 && priceValue <= 500
      },
      message: 'price must be greater than 0 and at most 500 AUD'
    }
  }
})

module.exports = mongoose.model('Book', bookSchema)
