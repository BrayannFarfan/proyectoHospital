import { Routes , Route } from 'react-router';
import { ContainerAuth } from './components/ContainerAuth/ContainerAuth';
import { ForgotPass } from './components/ForgotPass/ForgotPass.jsx';
import { ResetPassword } from './components/ResetPassword/ResetPassword.jsx';
import { Home } from './Page/home/home.jsx'
import { ContainerAuthRegister } from './components/ContainerAuth/ContainerAuthRegister.jsx';
import { About } from './Page/about/about.jsx';
import { OurPricing } from './Page/OurPricing/OurPricing.jsx';
import { Doctors } from './Page/doctors/Doctors.jsx';
import { Appointment } from './Page/appointment/Appointment.jsx';
import { Profile } from './Page/DashboardPatient/Profile.jsx';
import { DashboardPatient } from './Page/DashboardPatient/DashboardPatient.jsx';
import { FavoriteDoctor } from './components/DasboardPatient/FavoriteDoctor.jsx';
import { ChatContainer } from './Page/DashboardPatient/ChatContainer.jsx';
import { ResetPasswordChange } from './Page/DashboardPatient/ResetPasswordChange.jsx';
import { DoctorContainerDash } from './Page/DashboardPatient/DoctorContainer.jsx';
import { Detail } from './Page/detail/Detail.jsx';
import { SubmitReview } from './components/SubmitReview/SubmitReview.jsx';

function App() {

 
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
            <Route path="/our-pricing" element={< OurPricing/>} />
            <Route path="/my-profile" element={< Profile/>} />
            <Route path="/dashboard-user" element={< DashboardPatient/>} />
            <Route path="/favorites" element={< FavoriteDoctor/>} />
            <Route path="/messages" element={<ChatContainer/>} />
            <Route path="/change-password" element={<ResetPasswordChange/>} />
            <Route path="/schedule-timing" element={<DoctorContainerDash/>} />
            <Route path="/doctor-detail/:id" element={<Detail />} />
            <Route path="/submit-review/:id" element={<SubmitReview />} />
          </Routes>
    </>
  )
}

export default App
