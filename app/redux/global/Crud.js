import axios from 'axios';

const apiKeyMaps = 'AIzaSyDS875fQaHDZUcmAkYqzrsj9IG-SfBScVM';

export function Login(urlService, tokenBearer, user, pass) {
  return axios.post(
    urlService + '/danhmuc/LoginUser',
    {
      user: user,
      pass: pass,
    },
    {
      headers: {Authorization: 'Bearer ' + tokenBearer},
    },
  );
}

export function getDataDonVi(URL) {
  return axios.get(`${URL}`);
}

export function getLocation(latitude, longitude) {
  if (latitude && longitude) {
    return axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude},${longitude}&key=${apiKeyMaps}&language=vi`,
    );
  }
}

export function GetUserInfo(urlService, tokenBearer) {
  return axios.get(urlService + '/v1/user/GetUserInfo', {
    headers: {Authorization: 'Bearer ' + tokenBearer},
  });
}

export function uploadAvatar(urlService, token, body) {
  console.log(urlService + '/v1/user/UploadProfilePicture')
  return axios.post(urlService + '/v1/user/UploadProfilePicture', body, {
    headers: {Authorization: `bearer ${token}`},
  });
}
