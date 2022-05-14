import React from 'react';
import Typography from '@mui/material/Typography';

import { ErrorBox } from './Error.styles';

const Error = () => {
  return (
    <ErrorBox>
      <Typography variant='h1'> Oops, something went wrong!</Typography>
    </ErrorBox>
  );
};

export default Error;
