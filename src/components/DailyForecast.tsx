import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';
import { formatDate, formatTime, kelvinToCelsius, kelvinToFahrenheit } from '../utils/helpers';
import { UnitContext } from './TemperatureSwitch';

const ForecastContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
`;

const DayList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const DayCard = styled.div<{ selected: boolean }>`
  background: ${props => props.selected ? '#007bff' : '#f9f9f9'};
  color: ${props => props.selected ? '#fff' : '#333'};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 20px;
  text-align: center;
  width: 150px;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
  animation: ${fadeIn} 0.5s ease-in;

  &:hover {
    background: ${props => props.selected ? '#0056b3' : '#e6e6e6'};
    transform: translateY(-5px);
  }
`;

const Icon = styled.div<{ color: string }>`
  font-size: 3rem;
  margin-bottom: 10px;
  color: ${props => props.color};
  animation: ${fadeIn} 1s ease-in;
`;

const Details = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-in;
`;

interface DailyForecastProps {
  daily: any[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const { unit } = useContext(UnitContext);

  if (!daily.length) return null;

  const getWeatherIcon = (description: string) => {
    switch (true) {
      case /clear/.test(description):
        return <WiDaySunny color="#f7b733" />;
      case /rain/.test(description):
        return <WiRain color="#2345c9" />;
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
      <h2>Daily Forecast</h2>
      <DayList>
        {daily.map((day, index) => (
          <DayCard 
            key={index} 
            selected={index === selectedDay} 
            onClick={() => setSelectedDay(index)}
          >
            <div>{formatDate(day.dt)}</div>
            <div>{formatTime(day.dt)}</div>
            <Icon color={getWeatherIcon(day.weather[0].description)?.props.color}>
              {getWeatherIcon(day.weather[0].description)}
            </Icon>
            <div>{convertTemp(day.main.temp)}°{unit}</div>
          </DayCard>
        ))}
      </DayList>
      <Details>
        <h3>Details for {formatDate(daily[selectedDay].dt)}</h3>
        <p>{daily[selectedDay].weather[0].description}</p>
        <p>{convertTemp(daily[selectedDay].main.temp)}°{unit}</p>
        <p>Time: {formatTime(daily[selectedDay].dt)}</p>
      </Details>
    </ForecastContainer>
  );
};

export default DailyForecast;
