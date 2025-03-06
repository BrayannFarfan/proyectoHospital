import DoctorCard from './DoctorCard';
import { useDoctor } from '../../context/DoctorProvider';

const DoctorData = ({ limit = 6 }) => {
  const { doctors, loading, error } = useDoctor();
  

  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="doctors-grid">
      {doctors.data.slice(0, limit).map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorData;