import React from 'react'

function Review(review) {
  return (
    <div className='review'>
<div className='name'>{review.reviewerName}</div>
<div className='comment'>{review.comment}</div>
<div className='Rating'>{review.rating}</div>
    </div>
  )
}

export default Review