import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import ForecastTableRow from './ForecastTableRow';

const ForecastTable = ({ forecast }) => {
  return (
    <Table aria-label='collapsible table'>
      <TableBody>
        {forecast &&
          forecast.map((row, index) => (
            <ForecastTableRow key={index} row={row} />
          ))}
      </TableBody>
    </Table>
  );
};
export default ForecastTable;
