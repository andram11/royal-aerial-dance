
import { Route, Routes } from 'react-router-dom'

import HomePage from './pages/homePage'
import Navigation from './pages/navigation'
import Courses from './pages/courses'

function App() {


  return (
    <>
  <Navigation/> 
  <Routes>
    
    <Route path='/admin' element={<HomePage/>}></Route>
   <Route path='/admin/courses' element={<Courses/>}></Route> 
  </Routes>
    </>
  )
}

export default App
