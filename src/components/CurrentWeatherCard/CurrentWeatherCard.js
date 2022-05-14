import React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useLocation } from '../../hooks/useLocation';
import { useWeatherForecast } from '../../hooks/useWeatherForecast';
import {
  CurrentWeatherContainer,
  WeatherIcon,
} from './CurrentWeatherCard.styles';
import '../../css/weather-icons.min.css';

const CurrentWeatherCard = ({ coordinates }) => {
  const { data: todaysWeather } = useWeatherForecast(
    'todaysWeather',
    coordinates
  );

  const { location } = useLocation(coordinates);

  return (
    <CurrentWeatherContainer>
      <Box
        ml={1}
        mt={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
        }}
      >
        <Typography variant='h4' component='h1'>
          {location && `${location.locality}, ${location.countryCode}`}
        </Typography>
        <Typography variant='subtitle1' component='h2'>
          {todaysWeather && dayjs(new Date()).format('dddd, D MMM, HH:mm')}
        </Typography>
      </Box>
      <Box
        ml={1}
        mt={6}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Box>
          <Typography variant='h2' component='h2' mt={4}>
            {todaysWeather && Math.round(todaysWeather[0].temperature)}&deg;C
          </Typography>
          <Typography variant='h5' component='h3' pl={1}>
            {todaysWeather && todaysWeather[0].description}
          </Typography>
        </Box>
        <Box mb={3}>
          <WeatherIcon
            className={todaysWeather && todaysWeather[0].weatherIcon}
            fontSize='8rem'
          />
        </Box>
      </Box>
    </CurrentWeatherContainer>
  );
};

export default CurrentWeatherCard;
