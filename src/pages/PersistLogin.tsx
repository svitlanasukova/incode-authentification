import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../store/authentification-actions';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

const PersistLogin = () => {
  const isAthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token') || '';

    if (isAthenticated) {
      setIsLoading(false);
    } else {
      dispatch(refreshToken());
      if (!token) {
        setIsLoading(false);
      }
    }
  }, [isAthenticated]);

  return isLoading ? <p>Loading ...</p> : <Outlet />;
};

export default PersistLogin;
