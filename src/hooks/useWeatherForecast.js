import useSWR from 'swr';

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
  const todaysWeatherData = weatherData.timeSeries.filter(({ validTime }) =>
    validTime.includes(currentDate)
  );
  return todaysWeatherData;
};

const convertResponse = (data) => {
  const mapped = data.map((weather) => ({
    temperature: weather.parameters[10].values[0],
    date: weather.validTime,
    weatherIcon:
      iconPrefix +
      weatherDescriptions.default['day'][weather.parameters[18].values[0]].icon,
  }));
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
      isLoading: !data && !error,
      isError: error,
    };
  }
};
