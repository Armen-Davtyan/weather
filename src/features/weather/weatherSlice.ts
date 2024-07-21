import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchDailyForecast } from './weatherAPI';
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
      const currentWeatherResponse = await fetchCurrentWeather(city);
      const dailyForecastResponse = await fetchDailyForecast(city);
      return {
        currentWeather: currentWeatherResponse,
        hourlyForecast: dailyForecastResponse.filter((_: any, index: number) => index < 8),
        dailyForecast: dailyForecastResponse,
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
        state.hourlyForecast = action.payload.hourlyForecast;
        state.dailyForecast = action.payload.dailyForecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default weatherSlice.reducer;
