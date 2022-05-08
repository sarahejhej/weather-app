import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import { useWeatherForecast } from '../../hooks/useWeatherForecast';
import { useLocation } from '../../hooks/useLocation';
import SearchBar from '../../components/SearchBar';
import CurrentWeatherCard from '../../components/CurrentWeatherCard/CurrentWeatherCard';

const WeatherDetailsPage = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });

  const { todaysWeather, isLoading, isError } = useWeatherForecast(
    'todaysWeather',
    coordinates,
    shouldFetch
  );
  const { location } = useLocation(coordinates, shouldFetch);

  console.log(
    'todaysWeather, isLoading, isError, location',
    todaysWeather,
    isLoading,
    isError,
    location
  );

  useEffect(() => {
    setShouldFetch(true);
  }, []);

  const handleInputChange = (val) => {
    setShouldFetch(false);
    const { name, value } = val.target;
    setCoordinates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getWeatherForecastForDay = useCallback(() => {
    const dates = weatherForecast?.timeSeries
      .map(({ validTime }) => validTime.substr(0, 10))
      .filter((v, i, a) => a.indexOf(v) === i);
    const newArray = dates?.map((date) =>
      weatherForecast?.timeSeries.filter(({ validTime }) =>
        validTime.includes(date)
      )
    );
    return newArray;
  }, [weatherForecast]);

  const getTodaysWeather = useCallback((weatherData) => {
    const currentDate = weatherData?.referenceTime.substr(0, 10);
    return weatherData.timeSeries.find(({ validTime }) =>
      validTime.includes(currentDate)
    );
  }, []);

  const handleFetchWeather = () => {
    setShouldFetch(true);
  };

  const weatherForecastPerDay = getWeatherForecastForDay();
  const weatherAtNoon = weatherForecast?.timeSeries.filter(({ validTime }) =>
    validTime.includes('T12:00:00Z')
  );
  const paperStyle = {
    padding: '2rem',
    width: {
      xs: '100vw', // theme.breakpoints.up('xs')
      sm: '100vw', // theme.breakpoints.up('sm')
      md: '100vw', // theme.breakpoints.up('md')
      lg: '50vw', // theme.breakpoints.up('lg')
      xl: '50vw', // theme.breakpoints.up('xl')
    },
    height: {
      xs: '100vh', // theme.breakpoints.up('xs')
      sm: '100vh', // theme.breakpoints.up('sm')
      md: '100vh', // theme.breakpoints.up('md')
      lg: '70vh', // theme.breakpoints.up('lg')
      xl: '70vh', // theme.breakpoints.up('xl')
    },
    margin: '2rem auto',
  };

  return (
    <Container
      maxWidth='lg'
      display='flex'
      justify-content='center'
      align-items='center'
    >
      <Paper elevation={10} style={paperStyle}>
        <SearchBar
          onInputChange={handleInputChange}
          coordinates={coordinates}
          onFetchWeather={handleFetchWeather}
        />
        <CurrentWeatherCard />
      </Paper>
    </Container>
  );
};

export default WeatherDetailsPage;
