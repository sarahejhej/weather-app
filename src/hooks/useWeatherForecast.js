import useSWR from 'swr';
import dayjs from 'dayjs';

import * as weatherDescriptions from '../weatherDescriptions.json';
const iconPrefix = `wi wi-`;

const getWeatherForecastPerDay = (data) => {
  const dates = data
    ?.map(({ date }) => date.substr(0, 10))
    .filter((v, i, a) => a.indexOf(v) === i);
  const newArray = dates?.map((d) =>
    data?.filter(({ date }) => date.includes(d))
  );
  return newArray;
};

const getTodaysWeather = (weatherData) => {
  const currentDate = weatherData?.referenceTime?.substr(0, 10);
  const todaysWeatherData = weatherData.timeSeries.find(({ validTime }) =>
    validTime.includes(currentDate)
  );

  return [todaysWeatherData];
};

const convertResponse = (data) => {
  const mapped = data.map(({ validTime, parameters }) => {
    const hour = parseInt(dayjs(validTime).format().substring(11, 13));
    const isDay = hour >= 7 && hour <= 20;
    return {
      temperature: parameters.find( ({ name }) => name === 't').values[0],
      date: dayjs(validTime).format(),
      weatherIcon:
        iconPrefix +
        (isDay ? 'day-' : 'night-') +
        weatherDescriptions.default[isDay ? 'day' : 'night'][
          parameters.find(({ name}) => name === 'Wsymb2').values[0]
        ].icon,
      description:
        weatherDescriptions.default['day'][parameters[18].values[0]]
          .description,
    };
  });
  return mapped;
};

export const useWeatherForecast = (type, coordinates) => {
  const forecastApi = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;

  const { data, error } = useSWR(forecastApi);

  return {
    data: type === 'todaysWeather'
    ? data ? convertResponse(getTodaysWeather(data)) : null
    : data?.timeSeries ? getWeatherForecastPerDay(convertResponse(data.timeSeries)): null,
    error, 
  }
};
