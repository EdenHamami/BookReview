import React from 'react'
import "./booksList.css"
import BookCard from "./BookCard"
function BooksList({relevantBooks}) {
  return (
    <div className='booksList'>
        {relevantBooks.map(book=>(
            <BookCard key={book.id} book={book}/>
        ))}

    </div>
  )
}

export default BooksList