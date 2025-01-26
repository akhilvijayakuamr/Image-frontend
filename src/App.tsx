import React from 'react'
import Register from './Components/User/Register/Register'
import Verify from './Components/Verification/Verification'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserHome from './Components/User/Home/UserHome'
import Reset from './Components/Reset/Reset'
import Email from './Components/Email/Email'
import AllImage from './Components/AllImage/AllImage'
import Update from './Components/User/Update/Update'
import PublicRoute from './Route/PublicRoute'
import PrivateRoute from './Route/PrivateRoute'



const App: React.FC = () => {

  return (
    <Router>
      <Routes>

        <Route element={<PublicRoute/>}>
          <Route path='/' element={<Register />} />
          <Route path='/verify' element={<Verify />} />
        </Route>

        <Route element={<PrivateRoute/>}>
          <Route path='/home' element={<UserHome />} />
          <Route path='/reset' element={<Reset />} />
          <Route path='/email' element={<Email />} />
          <Route path='/posts' element={<AllImage />} />
          <Route path='/update' element={<Update />} />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
