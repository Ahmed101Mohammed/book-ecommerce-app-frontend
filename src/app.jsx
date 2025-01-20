import React, { useState } from 'react'
import Register from './components/Register.jsx'
import './index.css'
import { Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification.jsx'
import Sign from './components/Sign.jsx'

const App = () => {
  
  return (
    <>
      <Notification />
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path="/sign" element={<Sign />}/>
      </Routes>
    </>
  )
}

export default App
