import React, { useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';
import { UnitContext } from './TemperatureSwitch';
import { formatTime, kelvinToCelsius, kelvinToFahrenheit } from '../utils/helpers';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const ForecastContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
  width: 300px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.5s ease-out;
`;

const ForecastItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const Time = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const Temp = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #007bff;
`;

const Icon = styled.div`
  font-size: 1.5rem;
`;

interface HourlyForecastProps {
  hourly: any[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly }) => {
  const { unit } = useContext(UnitContext);

  if (!hourly.length) return null;

  const getWeatherIcon = (description: string) => {
    switch (true) {
      case /clear/.test(description):
        return <WiDaySunny color="#f7b733" />;
      case /rain/.test(description):
        return <WiRain color="#007bff" />;
      case /snow/.test(description):
        return <WiSnow color="#00bfff" />;
      case /cloud/.test(description):
        return <WiCloudy color="#b0bec5" />;
      case /storm/.test(description):
        return <WiThunderstorm color="#ff6f61" />;
      default:
        return <WiCloudy color="#b0bec5" />;
    }
  };

  const convertTemp = (temp: number) => {
    return unit === 'C' ? kelvinToCelsius(temp) : kelvinToFahrenheit(temp);
  };

  return (
    <ForecastContainer>
      <h2>Hourly Forecast</h2>
      {hourly.map((hour, index) => (
        <ForecastItem key={index}>
          <Time>{formatTime(hour.dt)}</Time>
          <Icon>{getWeatherIcon(hour.weather[0].description)}</Icon>
          <Temp>{convertTemp(hour.main.temp)}°{unit}</Temp>
        </ForecastItem>
      ))}
    </ForecastContainer>
  );
};

export default HourlyForecast;
