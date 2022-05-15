import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { SearchButton, SearchField } from './SearchBar.styles';

const SearchBar = ({ onFetchWeather }) => {
  const [coordinates, setCoordinates] = useState();
  const [error, setError] = useState(false);

  const handleInputChange = (val) => {
    const { name, value } = val.target;
    setCoordinates((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const handleFetchWeather = useCallback(
    (coordinates) => {
      if (!coordinates.latitude) {
        setError((prevState) => ({
          ...prevState,
          latitude: true,
        }));
      }
      if (!coordinates.longitude) {
        setError((prevState) => ({
          ...prevState,
          longitude: true,
        }));
      }
      if (!error) {
        onFetchWeather(coordinates);
      }
    },
    [error, onFetchWeather]
  );

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      noValidate
      autoComplete='off'
    >
      <SearchField
        id='longitude'
        name='longitude'
        label='Longitude'
        type='search'
        required
        onChange={handleInputChange}
        value={coordinates?.longitude || ''}
        placeholder='Enter longitude'
        error={error.longitude}
        helperText='*Required'
      />
      <SearchField
        id='latitude'
        name='latitude'
        label='Latitude'
        type='search'
        required
        onChange={handleInputChange}
        value={coordinates?.latitude || ''}
        placeholder='Enter latitude'
        error={error.latitude}
        helperText='*Required'
      />
      <SearchButton
        size='large'
        variant='contained'
        onClick={() => handleFetchWeather(coordinates)}
        disabled={!coordinates?.longitude || !coordinates?.latitude}
      >
        Fetch Weather
      </SearchButton>
    </Box>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onFetchWeather: PropTypes.func.isRequired,
};
