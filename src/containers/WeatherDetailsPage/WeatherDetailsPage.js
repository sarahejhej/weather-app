import React, { useCallback, useEffect, useState } from 'react';

import { Main } from './WeatherDetailsPage.styles';

const WeatherDetailsPage = () => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: 55.433993,
    longitude: 13.819552,
  });

  const address = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;

  const getWeatherForecast = useCallback(() => {
    fetch(address)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
      });
  }, [address]);

  useEffect(() => {
    getWeatherForecast();
  }, []);

  const handleInputChange = (val) => {
    const { name, value } = val.target;
    setCoordinates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getWeatherForecastForDay = useCallback(() => {
    const dates = weatherForecast?.timeSeries
      .map(({ validTime }) => validTime.substr(0, 10))
      .filter((v, i, a) => a.indexOf(v) === i);
    const newArray = dates?.map((date) =>
      weatherForecast?.timeSeries.filter(({ validTime }) =>
        validTime.includes(date)
      )
    );
    return newArray;
  }, [weatherForecast]);

  const weatherForecastPerDay = getWeatherForecastForDay();
  const weatherAtNoon = weatherForecast?.timeSeries.filter(({ validTime }) =>
    validTime.includes('T12:00:00Z')
  );

  return (
    <Main>
      <input
        value={coordinates.longitude}
        type='text'
        onChange={handleInputChange}
        name='longitude'
      />
      <input
        value={coordinates.latitude}
        type='text'
        onChange={handleInputChange}
        name='latitude'
      />
      <button onClick={() => getWeatherForecast()}>Hämta väder!</button>
    </Main>
  );
};

export default WeatherDetailsPage;
