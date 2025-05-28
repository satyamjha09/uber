import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import UserContext from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import CaptainContextProvider from './context/CaptainContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CaptainContextProvider>
      <UserContext>
        <BrowserRouter>
        <App />
     </BrowserRouter>
    </UserContext>
    </CaptainContextProvider>
  </StrictMode>,
)
