import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  CurrentWeatherContainer,
  WeatherIcon,
} from './CurrentWeatherCard.styles';
import '../../css/weather-icons.min.css';

const CurrentWeatherCard = () => {
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
          Stockholm, SE
        </Typography>
        <Typography variant='subtitle1' component='h2'>
          Tuesday, 4:53 AM, Clear sky
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
        <Typography variant='h2' component='h2' mt={4}>
          13&deg;C
        </Typography>
        <Box mb={3}>
          <WeatherIcon
            className='wi wi-night-sleet display-1'
            fontSize='8rem'
          />
        </Box>
      </Box>
    </CurrentWeatherContainer>
  );
};

export default CurrentWeatherCard;
