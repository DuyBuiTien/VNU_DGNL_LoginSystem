import axios from 'axios';

export function Login(urlService) {
  return axios({
    method: 'GET',
    url: urlService + '/third-parties/authentications/login',
    timeout: 15000,
    headers: {
      "Authorization": "TP-Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNzU0MyIsImlhdCI6MTU5NDk1MjYxNn0.NQQmQ__EhbuMcobla4fUPtXcZ4Wx-3f9ZfOuRmZ9mC8LZEkqjFQKbgpihB6CZvzn5193kpjRQ3-hcn4y-hitcA"
    }
  })
}
