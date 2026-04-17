const express = require('express')
const app = express()

const booksRoutes = require('./routes/books.routes')

// serve frontend
app.use(express.static('public'))

// use routes
app.use(booksRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
