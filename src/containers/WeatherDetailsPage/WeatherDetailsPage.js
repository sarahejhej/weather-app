import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';

import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader'
import CurrentWeatherCard from '../../components/CurrentWeatherCard/CurrentWeatherCard';
import ForecastWeatherCard from '../../components/ForecastWeatherCard/ForecastWeatherCard';
import { useWeatherForecast } from '../../hooks/useWeatherForecast';

const WeatherDetailsPage = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });
  const { data, loading } = useWeatherForecast('forecast', coordinates);

  const handleFetchWeather = useCallback((coordinates) => {
    setCoordinates(coordinates);
  }, []);

  useEffect(() => {
    handleFetchWeather(coordinates);
  }, [coordinates, handleFetchWeather]);

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
      { data &&
        <>
          <CurrentWeatherCard coordinates={coordinates} />
          <ForecastWeatherCard coordinates={coordinates} />
        </>
      }
      { loading &&
        <Loader />
      }
    </Container>
  );
};

export default WeatherDetailsPage;
