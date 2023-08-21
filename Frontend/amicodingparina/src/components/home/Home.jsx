import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loading from '../../specialComponents/Loading';

const Home = () => {
    const state = useSelector(state => state);
    
    if(state.isLoding){
      return <Loading />
    } else if(state.isAuthenticated) {
      return <Navigate to={'/dashboard'} replace />
    } else {
      return <Navigate to={'/login'} replace />
    }
}

export default Home