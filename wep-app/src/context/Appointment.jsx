import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children } = {}) => {

  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    
    if (user?.id) {
      setPatientId(user?.id);
    }
  }, []);

  const createAppointment = async (appointmentData) => {
    
    try {
      const response = await fetch('http://localhost:3000/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al crear la cita');
      }
      return data;
    } catch (error) {
      throw error;
    }
  };


  return (
    <AppointmentContext.Provider value={{ patientId, createAppointment}}>
      {children}
    </AppointmentContext.Provider>
  );
};