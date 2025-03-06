import { createContext, useState, useEffect, useContext } from 'react';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    getDoctors();
  }, []); 

  return (
    <DoctorContext.Provider value={{ doctors, loading, error, getDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};



export const useDoctor = () => {
    return useContext(DoctorContext);
};