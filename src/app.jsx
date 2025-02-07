import React, { useEffect } from 'react'
import Register from './components/Register/Register.jsx'
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Notification from './components/Notification/Notification.jsx'
import Login from './components/Login/Login.jsx'
import Header from './components/Header/Header.jsx'
import authServices from './services/auth.js'
import { useDispatch } from 'react-redux'
import { removeUser, setUser } from './reducers/user.js'
import usersServices from './services/users.js'
import UserProfile from './components/UserProfile/UserProfile.jsx'
import StoreBooksAdminView from './components/StoreBooksAdminView/StoreBooksAdminView.jsx'
import CreatingBookForm from './components/StoreBooksAdminView/CreatingBookForm.jsx'
import EditingBookForm from './components/StoreBooksAdminView/EditingBookForm.jsx'
import Home from './components/Home/Home.jsx'
const App = () => {
  const despatch = useDispatch()
  const getToken = async() =>
  {
    const accessTokenResponse = await authServices.refreshToken()
    if(accessTokenResponse.state)
    {
      const respons = await usersServices.getUserDataWithRefresh(accessTokenResponse.accessToken)
      if(respons.state)
      {
        despatch(setUser({
          accessToken: accessTokenResponse.accessToken,
          userData: respons.data
        }))
      }
    }
    else
    {
      despatch(removeUser())
    }

  }

  useEffect(()=>{getToken()},[])
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/myprofile" element={<UserProfile/>}/>
        <Route path="/storebooks" element={<StoreBooksAdminView/>}>
          <Route path="createbook" element={<CreatingBookForm/>}/>
          <Route path="editbook" element={<EditingBookForm/>}/>
        </Route>
      </Routes>
      <Notification />
    </>
  )
}

export default App
