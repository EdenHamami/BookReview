import React from 'react';
import "./BookCard.css";
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  const reviews = book.reviews;

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(2); // Round to 2 decimal places
  };

  const rating = calculateAverageRating(reviews);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {Array(fullStars).fill().map((_, i) => <i key={`full-${i}`} className="fas fa-star"></i>)}
        {halfStar === 1 && <i className="fas fa-star-half-alt"></i>}
        {Array(emptyStars).fill().map((_, i) => <i key={`empty-${i}`} className="far fa-star"></i>)}
      </>
    );
  };

  return (
    <Link to={`/book/${book.id}`}>
      <div className='book-card'>
        <img className="book-image" src={book.image} alt={book.title} />
        <div className='book-title'>{book.title}</div>
        <div className='book-category'>{book.category}</div>
        <div className='book-author'>{book.author}</div>
        <div className='book-rate'>{renderStars(rating)} ({rating})</div>
      </div>
    </Link>
  );
}

export default BookCard;
