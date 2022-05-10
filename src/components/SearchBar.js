import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SearchBar = ({ onFetchWeather }) => {
  const [coordinates, setCoordinates] = useState();

  const handleInputChange = (val) => {
    const { name, value } = val.target;
    setCoordinates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
        label='Longitude'
        type='search'
        required
        onChange={handleInputChange}
        value={coordinates?.longitude || ''}
      />
      <TextField
        id='latitude'
        name='latitude'
        label='Latitude'
        type='search'
        required
        onChange={handleInputChange}
        value={coordinates?.latitude || ''}
      />
      <Button
        color='secondary'
        variant='contained'
        onClick={() => onFetchWeather(coordinates)}
      >
        Fetch Weather
      </Button>
    </Box>
  );
};

export default SearchBar;
