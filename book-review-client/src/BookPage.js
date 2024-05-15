import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview } from './api/BooksApi';
import './BookPage.css';

function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const response = await getBookById(id);
      setBook(response.data);
    };
    fetchBook();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { rating, comment, reviewerName, reviewDate: new Date().toISOString() };
    await addReview(id, newReview);
    setBook(prevState => ({
      ...prevState,
      reviews: [...prevState.reviews, newReview]
    }));
    setRating(1);
    setComment("");
    setReviewerName("");
  };

  if (!book) {
    return (<div className="loading">Loading...</div>);
  }

  return (
    <div className='book-page'>
      <div className='book-page-left'>
        <img src={book.image} alt={book.title} className='book-page-image' />
        <h1>{book.title}</h1>
        <h2>by {book.author}</h2>
        <p>{book.description}</p>
        <p><strong>Category:</strong> {book.category}</p>
      </div>
      <div className='book-page-right'>
        <div className='book-page-right-content'>
          <h2>Reviews</h2>
          <div className='book-page-reviews'>
            {book.reviews.length > 0 ? (
              book.reviews.map((review, index) => (
                <div key={index} className='book-page-review'>
                  <p><strong>{review.reviewerName}</strong> ({new Date(review.reviewDate).toLocaleDateString()})</p>
                  <p>{'⭐'.repeat(review.rating)}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
        <div className='book-page-add-review'>
          <h3>Add a Review</h3>
          <form onSubmit={handleSubmit}>
            <div className='book-page-form-group'>
              <label>Reviewer Name:</label>
              <input
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                required
              />
            </div>
            <div className='book-page-form-group'>
              <label>Rating:</label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className='book-page-form-group'>
              <label>Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="book-page-submit-button">Add Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
