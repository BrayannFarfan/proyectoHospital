import { Routes , Route } from 'react-router';
import { ContainerAuth } from './components/ContainerAuth/ContainerAuth';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<ContainerAuth/>}  />
      </Routes>
    </>
  )
}

export default App
