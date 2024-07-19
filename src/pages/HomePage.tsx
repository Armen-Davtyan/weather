import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchWeather } from '../features/weather/weatherSlice';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import TemperatureSwitch from '../components/TemperatureSwitch';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const weather = useSelector((state: RootState) => state.weather);

  useEffect(() => {
    dispatch(fetchWeather('Yerevan'));
  }, [dispatch]);

  return (
    <div>
      <SearchBar />
      <WeatherDisplay weather={weather.currentWeather} />
      <TemperatureSwitch />
      <HourlyForecast hourly={weather.hourlyForecast} />
      <DailyForecast daily={weather.dailyForecast} />
    </div>
  );
};

export default HomePage;
