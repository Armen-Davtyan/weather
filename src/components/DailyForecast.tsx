import React, { useState } from 'react';
import styled from 'styled-components';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';
import { formatDate, formatTime } from '../utils/helpers';

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

const DayCard = styled.div<{ selected: boolean }>`
  background: ${props => props.selected ? '#007bff' : '#f1f1f1'};
  color: ${props => props.selected ? '#fff' : '#000'};
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  padding: 20px;
  text-align: center;
  width: 150px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background: ${props => props.selected ? '#0056b3' : '#e0e0e0'};
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 10px;
`;

const Details = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #f1f1f1;
  border-radius: 12px;
`;

interface DailyForecastProps {
  daily: any[];
}

const DailyForecast: React.FC<DailyForecastProps> = ({ daily }) => {
  const [selectedDay, setSelectedDay] = useState(0);

  if (!daily.length) return null;

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
            <Icon>{getWeatherIcon(day.weather[0].description)}</Icon>
            <div>{Math.round(day.main.temp - 273.15)}°C</div>
          </DayCard>
        ))}
      </DayList>
      <Details>
        <h3>Details for {formatDate(daily[selectedDay].dt)}</h3>
        <p>{daily[selectedDay].weather[0].description}</p>
        <p>{Math.round(daily[selectedDay].main.temp - 273.15)}°C</p>
        <p>Time: {formatTime(daily[selectedDay].dt)}</p>
      </Details>
    </ForecastContainer>
  );
};

export default DailyForecast;



