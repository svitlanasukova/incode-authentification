import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProtectedRoute from './pages/ProtectedRoute';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import { type RootState } from './store';

const App: React.FC = () => {
  const isAthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAthenticated={isAthenticated}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
