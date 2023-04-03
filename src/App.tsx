import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthGuard from './components/AuthGuard';
import AuthPage from './pages/AuthPage';
import PersistLogin from './components/PersistLogin';

const App = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
};

export default App;
