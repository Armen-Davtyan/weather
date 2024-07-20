import React, { createContext, useContext, useState } from 'react';
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

export const UnitContext = createContext({
  unit: 'C',
  toggleUnit: () => {},
});

export const TemperatureProvider: React.FC<{children: any}> = ({ children }) => {
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  return (
    <UnitContext.Provider value={{ unit, toggleUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

const TemperatureSwitch: React.FC = () => {
  const { unit, toggleUnit } = useContext(UnitContext);

  return (
    <SwitchContainer>
      <Button onClick={toggleUnit}>
        Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}
      </Button>
    </SwitchContainer>
  );
};

export default TemperatureSwitch;
