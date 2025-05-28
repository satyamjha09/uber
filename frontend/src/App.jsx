import React from 'react'
import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/home" element={
          <UserProtectWrapper>
             <Home />
          </UserProtectWrapper>
         
          } 
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup/>} />
        <Route path="/captainlogin" element={<CaptainLogin />} />
        <Route path="/captainsignup" element={<CaptainSignup />} />
        <Route path='/logout' element={
          <UserProtectWrapper>
           <UserLogout />
          </UserProtectWrapper>
        } />
        
        <Route path="/start" element={<Start />} />
        <Route path="*" element={<h1> Error on this page || no route is match</h1>} />
      </Routes>
       <ToastContainer />
    </div>
  )
}

export default App