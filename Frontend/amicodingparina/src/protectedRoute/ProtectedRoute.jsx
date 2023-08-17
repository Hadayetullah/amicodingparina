import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAuthenticated}) => {
  // if(!isAuthenticated){
  //   return <Navigate to={'/login'} replace />;
  
  // } 

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />;
}

export default ProtectedRoute;