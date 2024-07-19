import axios from 'axios';

const API_KEY = 'cd9cd92eac0c573bbdd2437f4cb01fbe';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const fetchCurrentWeather = async (city: string) => {
  const response = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}`);
  return response.data;
};

export const fetchDailyForecast = async (city: string) => {
  const response = await axios.get(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}`);
  return response.data.list;
};
