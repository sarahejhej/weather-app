import React, { useState } from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { ForecastTableCell } from './ForecastTable.styles';
import { WeatherIcon } from '../CurrentWeatherCard/CurrentWeatherCard.styles';

const ForecastTableRow = ({ forecastPerDay }) => {
  const [open, setOpen] = useState(false);

  // show weather for 14:00 local time (12:00 UTC time) if any, otherwise first in array
  const displayWeather =
    forecastPerDay.find(({ date }) => date.includes('T14')) ||
    forecastPerDay[0];

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>
        <ForecastTableCell size='medium' align='left'>
          {displayWeather && dayjs(displayWeather.date).format('dddd, D MMM')}
        </ForecastTableCell>
        <ForecastTableCell align='center' size='medium'>
          <WeatherIcon
            className={displayWeather && displayWeather.weatherIcon}
            fontSize='2rem'
          />
        </ForecastTableCell>
        <ForecastTableCell align='right' size='medium'>
          {Math.round(displayWeather.temperature)}&deg;C
        </ForecastTableCell>
      </TableRow>
      {/* Collapsible table showing weather forecast for all day */}
      <TableRow style={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='forecast'>
                <TableBody>
                  {forecastPerDay.map((forecast) => (
                    <TableRow
                      key={forecast.date}
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <ForecastTableCell>
                        {dayjs(forecast.date).format('HH:mm')}
                      </ForecastTableCell>
                      <ForecastTableCell align='center'>
                        <WeatherIcon
                          className={forecast.weatherIcon}
                          fontSize='1.8rem'
                        />
                      </ForecastTableCell>
                      <ForecastTableCell align='right'>
                        {Math.round(forecast.temperature)}&deg;C
                      </ForecastTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ForecastTableRow;
