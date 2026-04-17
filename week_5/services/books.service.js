let books = [
  {
    id: 'b1',
    title: 'The Three-Body Problem',
    author: 'Liu Cixin',
    year: 2008,
    genre: 'Science Fiction',
    summary: 'The Three-Body Problem is the first novel...'
  },
  {
    id: 'b2',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    year: 1847,
    genre: 'Classic',
    summary: 'An orphaned governess...'
  },
  {
    id: 'b3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    year: 1813,
    genre: 'Classic',
    summary: 'Elizabeth Bennet...'
  },
  {
    id: 'b4',
    title: 'The English Patient',
    author: 'Michael Ondaatje',
    year: 1992,
    genre: 'Historical Fiction',
    summary: 'In a ruined Italian villa...'
  },
  {
    id: 'b5',
    title: 'Small Gods',
    author: 'Terry Pratchett',
    year: 1992,
    genre: 'Fantasy',
    summary: 'In Omnia, the god Om...'
  }
]

const getAllBooks = () => books

const getBookById = id => {
  return books.find(b => b.id === id)
}

module.exports = {
  getAllBooks,
  getBookById
}
