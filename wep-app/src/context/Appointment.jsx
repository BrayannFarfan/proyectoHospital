import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    
    if (user.id) {
      setPatientId(user.id);
    } else {
      console.warn('No se encontró patientId en localStorage');
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

      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al crear la cita');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AppointmentContext.Provider value={{ patientId, createAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};