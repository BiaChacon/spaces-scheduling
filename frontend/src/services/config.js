import axios from 'axios';

export const http = axios.create({
  baseURL: 'https://spaces-scheduling.herokuapp.com/',
});

export default http;