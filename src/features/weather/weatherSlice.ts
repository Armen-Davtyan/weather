import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'cd9cd92eac0c573bbdd2437f4cb01fbe';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

interface WeatherState {
  currentWeather: any;
  hourlyForecast: any[];
  dailyForecast: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, { rejectWithValue }) => {
    try {
      const currentWeatherResponse = await axios.get(`${BASE_URL}weather?q=${city}&appid=${API_KEY}`);
      const dailyForecastResponse = await axios.get(`${BASE_URL}forecast?q=${city}&appid=${API_KEY}`);
      return {
        currentWeather: currentWeatherResponse.data,
        dailyForecast: dailyForecastResponse.data.list,
      };
    } catch (error) {
      return rejectWithValue('City not found');
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload.currentWeather;
        state.dailyForecast = action.payload.dailyForecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default weatherSlice.reducer;
