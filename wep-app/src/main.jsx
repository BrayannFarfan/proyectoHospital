import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { DoctorProvider } from './context/DoctorProvider.jsx';
import { AppointmentProvider } from './context/Appointment.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <App /> 
          </AppointmentProvider>
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
