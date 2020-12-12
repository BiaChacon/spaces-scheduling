import axios from 'axios';

export const http = axios.create({
  baseURL: 'localhost:3333/',
});

export default http;