import decode from 'jwt-decode';

export function isSignedIn() {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  } else {
    try {
      const { exp: expiration } = decode(token);
      const isExpired = !!expiration && Date.now() > expiration * 1000;
      if (isExpired)
        return false; 

      return true;
    } catch (_) { 
      return false;
    }
  }
}