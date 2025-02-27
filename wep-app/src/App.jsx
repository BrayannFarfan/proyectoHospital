import { Routes , Route, Navigate } from 'react-router';
import { ContainerAuth } from './components/ContainerAuth/ContainerAuth';
import { useAuth } from './context/AuthProvider'
import { Home } from './Page/home/home.jsx'
import { ContainerAuthRegister } from './components/ContainerAuth/ContainerAuthRegister.jsx';

function App() {

  const { user } = useAuth()

  return (
    <>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login-user' element={<ContainerAuth/>}  />
            <Route path='/register-user' element={<ContainerAuthRegister/>}  />
          </Routes>
    </>
  )
}

export default App
