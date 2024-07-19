import React, { useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const TemperatureSwitch: React.FC = () => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const handleSwitch = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <SwitchContainer>
      <Button onClick={handleSwitch}>
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Button>
    </SwitchContainer>
  );
};

export default TemperatureSwitch;
