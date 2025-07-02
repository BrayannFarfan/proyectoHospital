import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDoctor } from '../../context/DoctorProvider';
import './SubmitReview.css';

export const SubmitReview = () => {
  const { doctorId } = useParams();
  const { oneDoctor } = useDoctor();
  const navigate = useNavigate();
  
  // Usar doctorId de params o el ID del contexto como respaldo
  const currentDoctorId = doctorId || oneDoctor?.data?.id;
  
  const [formData, setFormData] = useState({
    rating: 0,
    patientName: '',
    email: '',
    comment: ''
  });

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar la review
    console.log('Review submitted:', { ...formData, doctorId });
    
    // Redirigir de vuelta al detalle del doctor
    navigate(`/doctor-detail/${currentDoctorId}`);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} onClick={() => handleStarClick(index + 1)}>
        {index < formData.rating ? (
          <AiFillStar className="star-filled clickable" />
        ) : (
          <AiOutlineStar className="star-empty clickable" />
        )}
      </span>
    ));
  };

  return (
    <div className="submit-review-page">
      <div className="submit-review-container-page">
        <div className="submit-review-header">
          <h2>Submit Your Review</h2>
          <p>Share your experience with this doctor</p>
        </div>

        <form onSubmit={handleSubmit} className="submit-review-form">
          {/* Rating Section */}
          <div className="form-group">
            <label>Rating *</label>
            <div className="star-rating">
              {renderStars()}
              <span className="rating-text">
                {formData.rating > 0 ? `${formData.rating} star${formData.rating > 1 ? 's' : ''}` : 'Select a rating'}
              </span>
            </div>
          </div>

          {/* Patient Name */}
          <div className="form-group">
            <label htmlFor="patientName">Your Name *</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              required
            />
          </div>

          {/* Comment */}
          <div className="form-group">
            <label htmlFor="comment">Your Review *</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Share your experience with this doctor..."
              rows="6"
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate(`/doctor-detail/${currentDoctorId}`)}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
