import HomePage from './pages/homePage'
import Navigation from './pages/navigation'
import { Route, Routes } from 'react-router-dom'

function App() {


  return (
    <>
  <Navigation/> 
  <Routes>
    <Route path='/admin' element={<HomePage/>}></Route>
  </Routes>
    </>
  )
}

export default App
