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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJtYWluX29yZ2FuaXphdGlvbl9pZCI6MzQxLCJ1c2VybmFtZSI6InJpa2tlaV91c2VyMSIsImN1c3RvbV9oaWdobGlnaHRfdG9waWNfbmV3cyI6MCwic3ViIjoiMTc1NDMiLCJleHAiOjE2NDc2NjA0MDEsImlhdCI6MTYxNjAzODAwMX0.lnLK7oTghXqZAGqHEO50r04wxEt3QX34s9VCGTIU770hIgMVYg6hxNkgAILmrI21CDiNADw7Ro3V0iwyBsUPtQ'
    }
  })
    .then(function (response) {
      return response.data?response.data:{data: []};
    })
    .catch(function (error) {
      console.log(error);
      return {data: []};
    });
};