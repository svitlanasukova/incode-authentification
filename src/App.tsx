import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RequireAuth from './pages/RequireAuth';
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
          <RequireAuth isAthenticated={isAthenticated}>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
