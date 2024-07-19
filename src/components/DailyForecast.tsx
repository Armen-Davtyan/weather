import React, { useState } from 'react';
import styled from 'styled-components';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiThunderstorm } from 'react-icons/wi';

const ForecastContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  margin: 20px;
`;

const DayList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const DayItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Details = styled.div`
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const Icon = styled.div`
  font-size: 2rem;
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
          <DayItem key={index} onClick={() => setSelectedDay(index)}>
            {new Date(day.dt * 1000).toLocaleDateString()}
            <Icon>{getWeatherIcon(day.weather[0].description)}</Icon>
          </DayItem>
        ))}
      </DayList>
      <Details>
        <h3>Details for {new Date(daily[selectedDay].dt * 1000).toLocaleDateString()}</h3>
        <p>{daily[selectedDay].weather[0].description}</p>
        <p>{Math.round(daily[selectedDay].main.temp - 273.15)}°C</p>
      </Details>
    </ForecastContainer>
  );
};

export default DailyForecast;

