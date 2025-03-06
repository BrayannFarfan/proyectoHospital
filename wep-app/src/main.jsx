import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider'
import { DoctorProvider } from './context/DoctorProvider.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DoctorProvider>
          <App /> 
        </DoctorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
