const express = require('express')
const mongoose = require('mongoose')
const booksRoutes = require('./routes/books.routes')

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.static('public'))
app.use(booksRoutes)

const startServer = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/booksdb')
    console.log('MongoDB Connected')

    app.listen(PORT, () => {
      console.log('Server running on port ' + PORT)
    })
  } catch (error) {
    console.log('MongoDB connection failed')
    console.log(error)
  }
}

startServer()
