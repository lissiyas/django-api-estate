

import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute  () {

  const accessToken = localStorage.getItem('accessToken');
  const isAuthenticated = !!accessToken;
    return (
      isAuthenticated? <Outlet/> : <Navigate to='/login'/>
    )
  }