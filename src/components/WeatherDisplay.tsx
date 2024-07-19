import React from 'react';
import styled from 'styled-components';

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
  if (!weather) return null;

  return (
    <Container>
      <h1>{weather.name}</h1>
      <Description>{weather.weather[0].description}</Description>
      <Temperature>{Math.round(weather.main.temp - 273.15)}°C</Temperature>
    </Container>
  );
};

export default WeatherDisplay;
