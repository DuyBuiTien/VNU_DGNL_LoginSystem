import axios from 'axios';

const apiKeyWeather = 'd522aa97197fd864d36b418f39ebb323';
const apiKeyAQI = '01bee551f2b5564731bfaca942f283f0b0c45048';

export function getAQI(latitude, longitude) {
  return axios.get(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKeyAQI}`);
}

export function getWeatherDaily(latitude, longitude) {
  return axios.get(
    `https://api.weather.com/v1/geocode/${latitude}/${longitude}/forecast/daily/7day.json?units=m&language=vi-VN&apiKey=${apiKeyWeather}`,
  );
}

export function getWeatherHourly(latitude, longitude) {
  return axios.get(
    `https://api.weather.com/v1/geocode/${latitude}/${longitude}/forecast/hourly/12hour.json?units=m&language=vi-VN&apiKey=${apiKeyWeather}`,
  );
}
