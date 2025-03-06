import { FaHeart , FaTrophy, FaMapMarkerAlt} from 'react-icons/fa';
import { Link } from 'react-router'

const DoctorCard = ({ doctor }) => {

  return (
    <div className="doctor-card"> {/* Reemplazamos el Link externo por un div */}
    <Link to="/doctor-detail" className="container_doctor"> {/* Movemos el Link a la sección clickable */}
      <div className="doctor-image">
        <img src={doctor.image || 'https://via.placeholder.com/150'} alt={doctor.name} />
        <span className="heart-icon">
          <FaHeart />
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