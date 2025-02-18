import { Routes , Route, Navigate } from 'react-router';
import { ContainerAuth } from './components/ContainerAuth/ContainerAuth';
import { useAuth } from './context/AuthProvider'
import { DashboardPatient } from './Page/DashboardPatient/DashboardPatient.jsx'
import { Home } from './Page/home/home.jsx'

function App() {

  const { user } = useAuth()

  return (
    <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login-user' element={<ContainerAuth/>}  />
            <Route path='/dashboard-patient' element={ user && <DashboardPatient/> }/>
          </Routes>
    </>
  )
}

export default App
