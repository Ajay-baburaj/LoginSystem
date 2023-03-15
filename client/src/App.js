import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import LandingPage from './pages/Landingpage'
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/profile" element={<Profile/>} />
    </Routes>
  </BrowserRouter>
     

  )
}

export default App