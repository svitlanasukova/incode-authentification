import axios, { Axios } from 'axios';
import store from '../store';
import { login } from '../store/authentication-slice';

export const BASE_URL = 'https://expa.fly.dev';

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}) as Axios;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}) as Axios;

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.token;
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('token') || '';

      const apiResponse = await axiosPublic.post('/auth/refresh', {
        refreshToken: JSON.parse(refreshToken)
      });

      store.dispatch(login(apiResponse.data.accessToken));

      error.config.headers['Authorization'] = `Bearer ${apiResponse.data.accessToken}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);
