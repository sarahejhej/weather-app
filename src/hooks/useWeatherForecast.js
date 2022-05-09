import useSWR from 'swr';

const fetcher = async (url) => {
  console.log('url', url);
  const res = await fetch(url);

  if (!res.ok) {
    const error = console.error(res.status);
    throw error;
  }

  return res.json();
};

// const getWeatherForecastForDay = () => {
//   const dates = weatherForecast?.timeSeries
//     .map(({ validTime }) => validTime.substr(0, 10))
//     .filter((v, i, a) => a.indexOf(v) === i);
//   const newArray = dates?.map((date) =>
//     weatherForecast?.timeSeries.filter(({ validTime }) =>
//       validTime.includes(date)
//     )
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

export const useWeatherForecast = (type, coordinates, shouldFetch) => {
  const forecastApi = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;

  const { data, error } = useSWR(shouldFetch ? forecastApi : null, fetcher);

  console.log('error, data', error, data);
  if (type === 'todaysWeather') {
    return {
      todaysWeather: data?.timeSeries ? getTodaysWeather(data) : null,
      isLoading: !data && !error,
      isError: error,
    };
  }
};
