import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{
  children: ReactNode;
  isAthenticated: boolean;
}> = ({ children, isAthenticated }) => {
  if (!isAthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
