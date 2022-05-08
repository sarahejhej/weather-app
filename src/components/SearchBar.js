import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ coordinates, onInputChange, onFetchWeather }) => {
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='longitude'
        name='longitude'
        label='Longitud'
        type='search'
        required
        onChange={onInputChange}
        value={coordinates.longitude}
      />
      <TextField
        id='latitude'
        name='latitude'
        label='Latitud'
        type='search'
        required
        onChange={onInputChange}
        value={coordinates.latitude}
      />
      <Button color='secondary' variant='contained' onClick={onFetchWeather}>
        Hämta väder
      </Button>
    </Box>
  );
};

export default SearchBar;
