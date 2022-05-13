import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';

import SearchBar from '../../components/SearchBar';
import CurrentWeatherCard from '../../components/CurrentWeatherCard/CurrentWeatherCard';
import ForecastWeatherCard from '../../components/ForecastWeatherCard/ForecastWeatherCard';

const WeatherDetailsPage = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });

  const handleFetchWeather = useCallback((coordinates) => {
    setCoordinates(coordinates);
  }, []);

  return (
    <Container
      display='flex'
      justify-content='center'
      align-items='center'
      sx={{
        maxWidth: '60rem',
        minHeight: '100vh',
        pt: 4,
        pb: 4
      }}
    >
      <SearchBar onFetchWeather={handleFetchWeather} />
      <CurrentWeatherCard coordinates={coordinates} />
      <ForecastWeatherCard coordinates={coordinates} />
    </Container>
  );
};

export default WeatherDetailsPage;
