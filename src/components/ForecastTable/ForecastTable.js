import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import ForecastTableRow from './ForecastTableRow';

const ForecastTable = ({ forecast }) => {
  return (
    <Table aria-label='collapsible table'>
      <TableBody>
        {forecast &&
          forecast.map((forecastPerDay) => (
            <ForecastTableRow
              key={new Date(forecastPerDay[0].date).getTime()}
              forecastPerDay={forecastPerDay}
            />
          ))}
      </TableBody>
    </Table>
  );
};
export default ForecastTable;

ForecastTable.propTypes = {
  forecast: PropTypes.array.isRequired,
};
