import { Routes , Route, Navigate } from 'react-router';
import { ContainerAuth } from './components/ContainerAuth/ContainerAuth';
import { ForgotPass } from './components/ForgotPass/ForgotPass.jsx';
import { ResetPassword } from './components/ResetPassword/ResetPassword.jsx';
import { useAuth } from './context/AuthProvider'
import { Home } from './Page/home/home.jsx'
import { ContainerAuthRegister } from './components/ContainerAuth/ContainerAuthRegister.jsx';
import { About } from './Page/about/about.jsx';
import { Doctors } from './Page/doctors/Doctors.jsx';
import { Appointment } from './Page/appointment/Appointment.jsx';

function App() {

  const { user } = useAuth()

  return (
    <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={< About/>}/>
            <Route path='/doctors' element={< Doctors/>}/>
            <Route path='/appointment' element={< Appointment/>}/>
            <Route path='/login-user' element={<ContainerAuth/>}  />
            <Route path='/register-user' element={<ContainerAuthRegister/>}  />
            <Route path='/forgot-password' element={<ForgotPass/>}  />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
    </>
  )
}

export default App
