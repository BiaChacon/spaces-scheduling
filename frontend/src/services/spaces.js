import { http } from './config';

export default {
  list:() => {
    return http.get('spaces')
  },

  save:(space) => {
    return http.post('spaces', space)
  }
}