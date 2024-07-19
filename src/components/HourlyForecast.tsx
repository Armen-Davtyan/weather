import React from 'react';
import styled from 'styled-components';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';

const ForecastContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Time = styled.div`
  font-size: 1rem;
  color: #333;
`;

const Temp = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
`;

const Icon = styled.div`
  font-size: 2rem;
`;

interface HourlyForecastProps {
  hourly: any[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  if (!hourly.length) return null;

  const getWeatherIcon = (description: string) => {
    switch (true) {
      case /clear/.test(description):
        return <WiDaySunny />;
      case /rain/.test(description):
        return <WiRain />;
      case /snow/.test(description):
        return <WiSnow />;
      case /cloud/.test(description):
        return <WiCloudy />;
      case /storm/.test(description):
        return <WiThunderstorm />;
      default:
        return <WiCloudy />;
    }
  };

  return (
    <ForecastContainer>
      <h2>Hourly Forecast</h2>
      {hourly.map((hour, index) => (
        <ForecastItem key={index}>
          <Icon>{getWeatherIcon(hour.weather[0].description)}</Icon>
          <Time>{new Date(hour.dt * 1000).toLocaleTimeString()}</Time>
          <Temp>{Math.round(hour.main.temp - 273.15)}°C</Temp>
        </ForecastItem>
      ))}
    </ForecastContainer>
  );
};

export default HourlyForecast;

