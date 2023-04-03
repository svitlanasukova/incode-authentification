import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from 'store';

const AuthGuard = () => {
  const isAthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const location = useLocation();

  return !isAthenticated ? <Navigate to="/auth" state={{ from: location }} replace /> : <Outlet />;
};

export default AuthGuard;
