import { useEffect, useState } from 'react';
import { FaHeart , FaTrophy, FaMapMarkerAlt} from 'react-icons/fa';
import { Link } from 'react-router'

const DoctorCard = ({ doctor }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isAlreadyFavorite = favorites.some((fav) => fav.id === doctor.id);
    setIsFavorite(isAlreadyFavorite);
  }, [doctor.id]);

  const handleFavoriteToggle = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== doctor.id);
    } else {
      favorites.push(doctor);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };



  return (
    <div className="doctor-card"> 
    <Link to="/doctor-detail" className="container_doctor">
      <div className="doctor-image">
        <img src={`http://localhost:3000/${doctor.profilePic}`} alt={doctor.name} />
          <span className="heart-icon" onClick={(e) => { e.preventDefault(); handleFavoriteToggle(); }}>
            <FaHeart color={isFavorite ? '#ff0000' : '#ccc'} /> 
          </span>
      </div>
      <div className="doctor-info">
        <h3>{doctor.title || 'DOCTOR'}</h3>
        <h4>{doctor.name} {doctor.lastName}</h4>
        <p>{(doctor.description || 'No description available').substring(0, 50)}...</p>
        <div className="rating">
          {'★'.repeat(Math.floor(doctor.rating || 4)) +
            '☆'.repeat(5 - Math.floor(doctor.rating || 4))}
          <span>({doctor.rating || 4})</span>
          <FaTrophy />
        </div>
        <div className="views">~ {doctor.views || 854} Views</div>
      </div>
    </Link>
    <div className="doctor_search">
      <Link to="/doctors-map" className="doctor_map"> {/* Agregamos 'to' */}
        <FaMapMarkerAlt /> View on map
      </Link>
      <Link to="/appointment" className="book-btn">
        Book now
      </Link>
    </div>
  </div>
  );
};

export default DoctorCard;