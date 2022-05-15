import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { LoaderBox } from './Loader.styles';

const Loader = () => {
  return (
    <LoaderBox>
      <CircularProgress sx={{ color: 'rgb(2, 186, 253)' }} />
    </LoaderBox>
  );
};

export default Loader;
