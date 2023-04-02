import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RequireAuth from './pages/RequireAuth';
import AuthPage from './pages/AuthPage';
import PersistLogin from './pages/PersistLogin';

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
