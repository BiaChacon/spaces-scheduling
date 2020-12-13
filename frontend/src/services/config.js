import axios from 'axios';

export const http = axios.create({
  baseURL: "https://spaces-scheduling.herokuapp.com/",
  // baseURL: "http://localhost:3333/"
});

export default http;