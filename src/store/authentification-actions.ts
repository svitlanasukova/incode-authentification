import { AppDispatch } from '.';
import axios from '../api/axios';
import { login, setError, setUser } from './authentication-slice';
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

export const signIn = (values: signInValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({
          username: values.userName,
          password: values.password
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        dispatch(login(response.data));
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

export const signUp = (values: signUpValues) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post(
        '/auth/register',
        JSON.stringify({
          password: values.password,
          username: values.userName,
          displayName: values.fullName
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        dispatch(setError(''));
        dispatch(setUser(response.data));
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
