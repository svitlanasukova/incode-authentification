import { AppDispatch } from '.';
import { axiosPublic, axiosPrivate } from '../api/axios';
import { login, logout, setError } from './authentication-slice';
import { AxiosError } from 'axios';

type signInValues = {
  userName: string;
  password: string;
};

type signUpValues = {
  userName: string;
  fullName: string;
  password: string;
};

export const signUp = (values: signUpValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axiosPublic.post(
        '/auth/register',
        JSON.stringify({
          password: values.password,
          username: values.userName,
          displayName: values.fullName
        })
      );

      if (response.status === 201) {
        dispatch(setError(''));
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        dispatch(setError('No server response.'));
      } else if (err.response.status === 409) {
        dispatch(setError('Username is already used by another user.'));
      } else {
        dispatch(setError('Signing up failed!'));
      }
    }
  };
};

export const signIn = (values: signInValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axiosPublic.post(
        '/auth/login',
        JSON.stringify({
          username: values.userName,
          password: values.password
        })
      );

      if (response.status === 201) {
        localStorage.setItem('token', JSON.stringify(response.data.refreshToken));
        dispatch(login(response.data.accessToken));
        dispatch(setError(''));
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        dispatch(setError('No server response.'));
      } else if (err.response.status === 404) {
        dispatch(setError('User not found'));
      } else if (err.response.status === 401) {
        dispatch(setError('Invalid username or password'));
      } else {
        dispatch(setError('Signing in failed!'));
      }
    }
  };
};

export const userLogout = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axiosPrivate.get('/auth/logout');

      if (response.status === 200) {
        dispatch(logout());
        dispatch(setError(''));
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        dispatch(setError('No server response.'));
      } else if (err.response.status === 401) {
        dispatch(setError('Unauthorized'));
      } else {
        dispatch(setError('Logging out failed!'));
      }
    }
  };
};

export const refreshToken = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const refreshToken = localStorage.getItem('token') || '';

      if (refreshToken) {
        const response = await axiosPublic.post('/auth/refresh', {
          refreshToken: JSON.parse(refreshToken)
        });
        if (response.status === 201) {
          dispatch(login(response.data.accessToken));
          dispatch(setError(''));
        }
      }
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        dispatch(setError('No server response.'));
      } else if (err.response.status === 403) {
        dispatch(logout());
      } else {
        dispatch(setError('Refresh token failed!'));
      }
    }
  };
};
