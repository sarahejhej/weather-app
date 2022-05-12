import React, { useState } from 'react';
import dayjs from 'dayjs';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { WeatherIcon } from '../CurrentWeatherCard/CurrentWeatherCard.styles';

const ForecastTableRow = ({ row }) => {
  const [open, setOpen] = useState(false);

  const displayWeather = row.find(({ date }) => date.includes('T14')) || row[0];

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' }, cursor: 'pointer' }} onClick={() => setOpen(!open)} >
        <TableCell size='medium' component='th' scope='row' align='left' style={{ width: '30%'}}>
          {displayWeather && dayjs(displayWeather.date).format(`dddd,
          D MMM`)}
        </TableCell>
        <TableCell align='center' size='medium' style={{ width: '25%'}}>
          <WeatherIcon
            className={displayWeather && displayWeather.weatherIcon}
            fontSize='2rem'
          />
        </TableCell>
        <TableCell align='right' size='medium' style={{ width: '25%'}}>{displayWeather.temperature}</TableCell>
      </TableRow>
    </>
  );
};

export default ForecastTableRow;
