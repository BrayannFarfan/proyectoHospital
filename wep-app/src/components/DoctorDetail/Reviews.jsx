import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Link } from 'react-router';
import { useDoctor } from '../../context/DoctorProvider';

const Reviews = () => {
  const { oneDoctor } = useDoctor();
  
  const reviews = [];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      index < rating ? (
        <AiFillStar key={index} className="star-filled" />
      ) : (
        <AiOutlineStar key={index} className="star-empty" />
      )
    ));
  };

  const averageRating = 4.5;
  const totalReviews = reviews.length;
  
  const ratingBreakdown = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    4: reviews.filter(r => r.rating === 4).length
  };

  return (
    <div className="tab-content">
      <div className="reviews-new-layout">
        <h3 className="doctor-name-review">Dr. {oneDoctor?.data.name} {oneDoctor?.data.lastName}</h3>
        
        <div className="rating-summary-container">
          <div className="rating-info-section">
            <div className="rating-value-box">
              <span className="rating-number-large">{averageRating}</span>
            </div>
            
            <div className="stars-display">
              {Array.from({ length: 5 }, (_, index) => {
                if (index < Math.floor(averageRating)) {
                  return <AiFillStar key={index} className="star-filled" />;
                } else {
                  return <AiOutlineStar key={index} className="star-empty" />;
                }
              })}
            </div>
            
            <p className="review-summary-text">Based on {totalReviews} reviews</p>
          </div>
          
          <div className="rating-breakdown-new">
            {[5, 4, 3, 2, 1].map(star => {
              const count = ratingBreakdown[star];
              const percentage = (count / totalReviews) * 100;
              return (
                <div key={star} className="rating-bar-new">
                  <div className="bar-container">
                    <div 
                      className="bar-fill" 
                      style={{width: `${percentage}%`}}
                    ></div>
                  </div>
                  <div className="rating-bar-right">
                    <span className="star-label">{star}</span>
                    <AiFillStar className="star-icon-small" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="reviews-list-new">
          <h4>Recent Reviews</h4>
          {
           reviews.length == 0 ?
            <p>No hay comments</p> 
            :
            reviews.map((review, index) => (
            <div key={review.id}>
              <div className="review-item-new">
                <div className="review-top-section">
                  <div className="reviewer-avatar">
                    <img 
                      src={`https://i.pravatar.cc/50?img=${review.id + 10}`} 
                      alt={review.patientName}
                      className="avatar-image"
                    />
                  </div>
                  <div className="review-rating-new">
                    {renderStars(review.rating)}
                  </div>
                </div>
                
                <div className="review-middle-section">
                  <span className="reviewer-name-new">{review.patientName}</span>
                  <span className="review-date-new">{review.date}</span>
                </div>
                
                <p className="review-comment-new">{review.comment}</p>
              </div>
              
              {index < reviews.length - 1 && <div className="review-divider"></div>}
            </div>
          ))
          }

          
          <div className="submit-review-container">
            <Link 
              to={`/submit-review/${oneDoctor?.data.id}`} 
              className="submit-review-btn"
            >
              Submit Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
