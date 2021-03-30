import axios from 'axios';

export const requestGET = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPATCH = async (URL, data) => {
  return await axios({
    method: 'PATCH',
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error)
      return {data: []};
    });
};

export const requestPOST_CC = async (URL, data, token) => {
  return await axios({
    method: 'POST',
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error)
      return {data: []};
    });
};

export const requestPOSTWSO2 = async (URL, data) => {
  return await axios({
    method: 'POST',
    headers: {Authorization: 'Bearer 76faf6a5-b128-3a1e-b56b-4dc290239587', 'Content-Type': 'application/json'},
    url: URL,
    data: data,
    timeout: 15000,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestGET_AIC = async (URL) => {
  return await axios({
    method: 'GET',
    url: URL,
    timeout: 15000,
    headers: {
      "CLIENTAPIKEY": "5ce554c2-1332-481e-97c2-5856d9612433"
    }
  })
    .then(function (response) {
      return response.data?response.data.results:{data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_AIC = async (URL, data) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
    headers: {
      "CLIENTAPIKEY": "5ce554c2-1332-481e-97c2-5856d9612433"
    }
  })
    .then(function (response) {
      return response.data?response.data.results:{data: []};
    })
    .catch(function (error) {
      return {data: []};
    });
};

export const requestPOST_NETVIEW = async (URL, data, token) => {
  return await axios({
    method: 'POST',
    url: URL,
    data: data,
    timeout: 15000,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(function (response) {
      return response.data?response.data:{data: null};
    })
    .catch(function (error) {
      return {data: null};
    });
};