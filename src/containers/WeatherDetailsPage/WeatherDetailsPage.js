import React, { useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import SearchBar from '../../components/SearchBar';

const WeatherDetailsPage = () => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });
  const [location, setLocation] = useState(null);

  const forecastApi = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;
  const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=sv`;
  console.log('address', forecastApi);
  const getWeatherForecast = useCallback(() => {
    fetch(forecastApi)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  }, [forecastApi]);

  const getLocation = useCallback(() => {
    fetch(locationApi)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setLocation();
      });
  }, [locationApi]);

  useEffect(() => {
    if (coordinates) {
      getWeatherForecast();
      getLocation();
    }
  }, []);

  const handleInputChange = (val) => {
    console.log('val', val);
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
      justifyContent='center'
      alignItems='center'
    >
      <Paper elevation={10} style={paperStyle}>
        <SearchBar
          onInputChange={handleInputChange}
          coordinates={coordinates}
          onGetWeatherForecast={getWeatherForecast}
        />
      </Paper>
    </Container>
  );
};

export default WeatherDetailsPage;
