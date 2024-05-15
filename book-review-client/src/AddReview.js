import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addReview } from './api/BooksApi';
import './AddReview.css';

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [reviewerName, setReviewerName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addReview(id, { rating, comment, reviewerName, reviewDate: new Date().toISOString() });
    navigate(`/book/${id}`);
  };

  return (
    <div className='add-review'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Reviewer Name:</label>
          <input
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Review</button>
      </form>
    </div>
  );
}

export default AddReview;
