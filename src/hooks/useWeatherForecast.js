import useSWR from 'swr';
import dayjs from 'dayjs';

import * as weatherDescriptions from '../weatherDescriptions.json';
const iconPrefix = `wi wi-`;

// const getWeatherForecastForDay = (data) => {
//   const dates = data?.timeSeries
//     .map(({ validTime }) => validTime.substr(0, 10))
//     .filter((v, i, a) => a.indexOf(v) === i);
//   const newArray = dates?.map((date) =>
//     data?.timeSeries.filter(({ validTime }) => validTime.includes(date))
//   );
//   return newArray;
// };

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
      temperature: parameters[10].values[0],
      date: dayjs(validTime).format(),
      weatherIcon:
        iconPrefix +
        (isDay ? 'day-' : 'night-') +
        weatherDescriptions.default[isDay ? 'day' : 'night'][
          parameters[18].values[0]
        ].icon,
      description:
        weatherDescriptions.default['day'][parameters[18].values[0]]
          .description,
    };
  });
  return mapped;
};

export const useWeatherForecast = (type, coordinates, shouldFetch) => {
  const forecastApi = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;

  const { data, error } = useSWR(shouldFetch ? forecastApi : null);

  if (type === 'todaysWeather') {
    return {
      todaysWeather: data?.timeSeries
        ? convertResponse(getTodaysWeather(data))
        : null,
      isLoadingWeather: !data && !error,
      isWeatherError: error,
    };
  }
};
