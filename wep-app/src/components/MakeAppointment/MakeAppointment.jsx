// src/components/MakeAppointment.jsx
import { AppointmentProvider } from '../../context/Appointment';
import { AppointmentForm } from '../AppointmentForm/AppointmentForm';
import './MakeAppointment.css';

export const MakeAppointment = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <AppointmentProvider>
      
 
          {
            user? 
            <section className="make-appointment">
            <div className="appointment-left">
              <h2>Make An Appointment To Visit Our Doctor</h2>
              <p>Schedule a consultation with our expert doctors for personalized care and health solutions.</p>
            </div>
            <div className="appointment-right">
              <AppointmentForm />
            </div>
          </section>
          :
          <section className="make-appointment">
            <div className="appointment-left">
              <h2>Please Login to Make An Appointment</h2>
              <p>To schedule an appointment, please log in to your account.</p>
            </div>
            <div className="appointment-right">
              <p className="login-prompt">You need to be logged in to make an appointment.</p>
            </div>
          </section>
          }
        
    </AppointmentProvider>
  );
};

export default MakeAppointment;