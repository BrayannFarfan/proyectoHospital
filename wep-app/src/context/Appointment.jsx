import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export const useAppointment = () => useContext(AppointmentContext);

export const AppointmentProvider = ({ children } = {}) => {

  const [patientId, setPatientId] = useState(null);
  const [ availabilityAppointment , setAvailabilityAppointment ] = useState([]);

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


  const getaVailableAppointments = async (medicId) => {
    try {
      const response = await fetch(`http://localhost:3000/medic/${medicId}/availability`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setAvailabilityAppointment(data);
      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener las citas disponibles');
      }
      return data;
    } catch (error) {
      throw error;
    }
  }


  return (
    <AppointmentContext.Provider value={{ patientId, createAppointment, getaVailableAppointments, availabilityAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};