import { createContext, useState, useEffect, useContext } from 'react';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [ oneDoctor, setOneDoctor] = useState(null);

  const getDoctors = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/medic/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const medics = await response.json();
      setDoctors(medics);
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const getDoctorById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3000/medic/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const doctor = await response.json();
      setOneDoctor(doctor);
      return true;
    } catch (error) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  }

  const getSpecialties = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/specialties/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setSpecialties(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getDoctorsBySpecialty = (specialtyId) => {
    const specialty = specialties.find((s) => s.id === specialtyId);
    setSelectedSpecialty(specialty);
    return specialty ? specialty.doctors || [] : [];
  };



  useEffect(() => {
    getDoctors();
    getSpecialties();
  }, []); 

  return (
    <DoctorContext.Provider value={{specialties, selectedSpecialty, setSelectedSpecialty, getDoctorsBySpecialty,doctors, loading, error, getDoctors, oneDoctor, getDoctorById }}>
      {children}
    </DoctorContext.Provider>
  );
};



export const useDoctor = () => {
    return useContext(DoctorContext);
};