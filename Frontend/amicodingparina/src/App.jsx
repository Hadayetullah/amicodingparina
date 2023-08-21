
import { useEffect } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import './App.css'
import Navbar from './components/app_bar/Navbar'
import Login from './components/login/Login'
import Registration from './components/registration/Registration'
import Dashboard from './components/dashboard/Dashboard'
import Data from './components/data/Data'
import Logout from './components/logout/Logout'
import Home from './components/home/Home'

import { authCheck } from './redux/actionCreators'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(authCheck())
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/data' exact element={<Data />} />
        
        <Route path='/login' exact element={<Login />} />
        <Route path='/register' exact element={<Registration />} />
        <Route path='/logout' exact element={ <Logout />} />
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </>
  )
}

export default App
