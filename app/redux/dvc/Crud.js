import axios from 'axios';

export function Login(urlService, user, pass) {
  return axios.post(urlService + '/GetTokenKeyDVC', {
    user: user,
    pass: pass,
  });
}
