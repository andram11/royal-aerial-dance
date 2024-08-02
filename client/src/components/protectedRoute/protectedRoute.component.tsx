// src/components/ProtectedRoute/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { selectIsAuthenticated, selectUser } from '../../state/user/userSlice';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user= useAppSelector(selectUser)
  const location= useLocation()

  return isAuthenticated && user ? element : <Navigate to="/login" state={{from:location}}/>;
};

export default ProtectedRoute;
