import axios from 'axios';

export function getContact(urlService, token, type) {
  return axios.get(urlService + '/v1/contact/GetContacts', {
    params: {
      type: type,
      page: 0,
      perpage: 2000,
    },
    headers: {Authorization: `bearer ${token}`},
  });
}

export function getConversations(urlService, token) {
  return axios.get(urlService + '/v1/message/getConversations', {
    params: {
      gskip: 0,
      pskip: 0,
    },
    headers: {Authorization: `bearer ${token}`},
  });
}

export function getConversation(urlService, token, id, skip, limit) {
  return axios.get(`${urlService}/v1/message/${id}?skip=${skip}&limit=${limit}`, {
    headers: {Authorization: `bearer ${token}`},
  });
}

export function createMessage(urlService, token, message) {
  return axios.post(urlService + '/v1/message/createMessage', message, {
    headers: {Authorization: 'Bearer ' + token},
  });
}

export function deleteMessage(urlService, token, id) {
  return axios.delete(urlService + '/v1/message/deleteMessage?id=' + id, {
    headers: {Authorization: 'Bearer ' + token},
  });
}

export function uploadFile(urlService, token, body) {
  return axios.post(urlService + '/v1/message/files', body, {
    headers: {Authorization: `bearer ${token}`},
  });
}
export function uploadPhoto(urlService, token, body) {
  return axios.post(urlService + '/v1/message/photos', body, {
    headers: {Authorization: `bearer ${token}`},
  });
}

export function uploadAvatar(urlService, token, body) {
  return axios.post(urlService + '/v1/user/avatar', body, {
    headers: {Authorization: `bearer ${token}`},
  });
}

export function fetchContactsChatGroup(urlService, token) {
  return axios.get(`${urlService}/v1/contact/GetContactsChatGroup`, {
    headers: {Authorization: `bearer ${token}`},
  });
}

export function searchUser(urlService, token, key, page = 0, perpage = 100) {
  return axios.get(`${urlService}/v1/user/ListUser`, {
    params: {
      q: key,
      page: page,
      perpage: perpage,
    },
    headers: {Authorization: `bearer ${token}`},
  });
}

export function ThemContact(urlService, token, username) {
  return axios.post(
    urlService + '/v1/contact/CreateContact',
    {username: username},
    {
      headers: {Authorization: `bearer ${token}`},
    },
  );
}

export function HuyContact(urlService, token, idContact) {
  return axios.post(
    urlService + '/v1/contact/HandleContact',
    {id: idContact, status: 2},
    {
      headers: {Authorization: `bearer ${token}`},
    },
  );
}

export function DongYContact(urlService, token, idContact) {
  return axios.post(
    urlService + '/v1/contact/HandleContact',
    {id: idContact, status: 1},
    {
      headers: {Authorization: `bearer ${token}`},
    },
  );
}
