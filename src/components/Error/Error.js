import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import { ErrorBox } from './Error.styles';

const Error = ({ dataError }) => {
  return (
    <ErrorBox>
      <Typography variant='h1'>
        {dataError ? dataError.message : 'Oops, something went wrong!'}
      </Typography>
    </ErrorBox>
  );
};

export default Error;

Error.propTypes = {
  dataError: PropTypes.object,
};
