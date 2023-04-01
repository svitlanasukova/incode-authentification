import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const RequireAuth = () => {
  const isAthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  return !isAthenticated ? <Navigate to="/auth" state={{ from: location }} replace /> : <Outlet />;
};

export default RequireAuth;
