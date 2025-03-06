import { FaHeart , FaTrophy, FaMapMarkerAlt} from 'react-icons/fa';
import { Link } from 'react-router'

const DoctorCard = ({ doctor }) => {

  return (
    <Link to={'/doctor-datil'} className='container_doctor'>
      <div className="doctor-card">
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
            <FaTrophy/>
          </div>
          <div className="views">~ {doctor.views || 854} Views</div>
          <div className='doctor_search'>
            <Link className='doctor_map'>
              <FaMapMarkerAlt />  View on map
            </Link>
            <Link className="book-btn" to={'/appointment'} >
              Book now
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DoctorCard;