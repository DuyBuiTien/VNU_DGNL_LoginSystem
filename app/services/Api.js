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
