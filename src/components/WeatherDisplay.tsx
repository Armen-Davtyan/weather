import React, { useContext } from 'react';
import styled from 'styled-components';
import { UnitContext } from './TemperatureSwitch';
import { kelvinToCelsius, kelvinToFahrenheit } from '../utils/helpers';

const Container = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
`;

const Temperature = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

interface WeatherDisplayProps {
  weather: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const { unit } = useContext(UnitContext);

  if (!weather) return null;

  const convertTemp = (temp: number) => {
    return unit === 'C' ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);
  };

  return (
    <Container>
      <h1>{weather.name}</h1>
      <Description>{weather.weather[0].description}</Description>
      <Temperature>{convertTemp(weather.main.temp)}°{unit}</Temperature>
    </Container>
  );
};

export default WeatherDisplay;
