import axios from 'axios';
import store from '../store/index'

let tokinho = localStorage.getItem('token');
console.log(tokinho);

let tokinho2 =  store.state.token;
console.log(tokinho2)

export const http = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {"x-access-token": tokinho2}
});

export default http;