// src/components/MakeAppointment.jsx
import React from 'react';
import { AppointmentProvider } from '../../context/Appointment';
import { AppointmentForm } from '../AppointmentForm/AppointmentForm';
import './MakeAppointment.css';

export const MakeAppointment = () => {
  return (
    <AppointmentProvider>
      <section className="make-appointment">
        <div className="appointment-left">
          <h2>Make An Appointment To Visit Our Doctor</h2>
          <p>Schedule a consultation with our expert doctors for personalized care and health solutions.</p>
        </div>
        <div className="appointment-right">
          <AppointmentForm />
        </div>
      </section>
    </AppointmentProvider>
  );
};

export default MakeAppointment;