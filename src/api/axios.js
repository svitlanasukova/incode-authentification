import axios from 'axios';

export const BASE_URL = 'https://expa.fly.dev';

export default axios.create({
  baseURL: BASE_URL
});
