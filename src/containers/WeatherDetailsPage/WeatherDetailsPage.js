import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import SearchBar from '../../components/SearchBar';
import CurrentWeatherCard from '../../components/CurrentWeatherCard/CurrentWeatherCard';

const WeatherDetailsPage = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });

  const handleFetchWeather = (coordinates) => {
    setCoordinates(coordinates);
    setShouldFetch(true);
  };

  // const getWeatherForecastForDay = useCallback(() => {
  //   const dates = weatherForecast?.timeSeries
  //     .map(({ validTime }) => validTime.substr(0, 10))
  //     .filter((v, i, a) => a.indexOf(v) === i);
  //   const newArray = dates?.map((date) =>
  //     weatherForecast?.timeSeries.filter(({ validTime }) =>
  //       validTime.includes(date)
  //     )
  //   );
  //   return newArray;
  // }, [weatherForecast]);

  // const weatherAtNoon = weatherForecast?.timeSeries.filter(({ validTime }) =>
  //   validTime.includes('T12:00:00Z')
  // );

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
        <SearchBar onFetchWeather={handleFetchWeather} />
        <CurrentWeatherCard
          shouldFetch={shouldFetch}
          coordinates={coordinates}
        />
      </Paper>
    </Container>
  );
};

export default WeatherDetailsPage;
