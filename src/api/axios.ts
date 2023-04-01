import axios, { Axios } from 'axios';

export const BASE_URL = 'https://expa.fly.dev';

export default axios.create({
  baseURL: BASE_URL
}) as Axios;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
}) as Axios;
