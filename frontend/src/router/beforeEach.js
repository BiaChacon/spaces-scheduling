import { isSignedIn } from '../services/auth';

export default async (to, from, next) => {
  if (to.name !== 'login' && !isSignedIn()) {
    next('/login');
  }else{
    if (to.name === 'login' && isSignedIn()) {
      next('/');
    } else {
      next()
      return;
    }
  }
}