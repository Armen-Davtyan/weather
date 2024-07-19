const API_KEY = 'cd9cd92eac0c573bbdd2437f4cb01fbe';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchCurrentWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('City not found');
  }
  return response.json();
};

export const fetchDailyWeather = async (city: string) => {
  const response = await fetch(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  if (!response.ok) {
    throw new Error('City not found');
  }
  return response.json();
};
