// src/components/ProtectedRoute/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/authContext';


interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const {loggedIn} = useAuth()

  const location= useLocation()

  return loggedIn? element : <Navigate to="/" state={{from:location}}/>;
};

export default ProtectedRoute;
