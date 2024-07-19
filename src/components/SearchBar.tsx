import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchWeather } from '../features/weather/weatherSlice';
import styled from 'styled-components';
import Modal from './Modal';

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  width: 200px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSearch = async () => {
    const resultAction = await dispatch(fetchWeather(city));
    if (fetchWeather.rejected.match(resultAction)) {
      setModalMessage('City not found. Please try again.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
    <SearchContainer>
      <Input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <Button onClick={handleSearch}>Search</Button>
    </SearchContainer>
    {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
    </>
  );
};

export default SearchBar;
