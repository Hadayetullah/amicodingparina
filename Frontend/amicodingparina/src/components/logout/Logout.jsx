import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/actionCreators';

const Logout = () => {
    // const dispatch = useDispatch();
    // dispatch(logout())
    const navigate = useNavigate()
  return navigate('/login')
}

export default Logout