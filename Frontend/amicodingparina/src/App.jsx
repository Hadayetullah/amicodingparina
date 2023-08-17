
import { useEffect, useState } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Navbar from './components/app_bar/Navbar'
import Login from './components/login/Login'
import Registration from './components/registration/Registration'
import Dashboard from './components/dashboard/Dashboard'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import Data from './components/data/Data'
import { authCheck, authDetails, logout } from './redux/actionCreators'
import Logout from './components/logout/Logout'

function App() {
  const state = useSelector(state => state);

  useEffect(()=> {
    authCheck()
  }, [])

  return (
    <>
      <Navbar isAuthenticated={state.isAuthenticated} />
      <Routes>
        <Route path='/data' exact element={<Data />} />
        <Route path='/dashboard' exact element={<Dashboard isAuthenticated={state.isAuthenticated} />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path='/login' exact element={<Login isAuthenticated={state.isAuthenticated} />} />
        <Route path='/register' exact element={<Registration />} />
        <Route path='/logout' exact element={ <Logout />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  )
}

export default App
