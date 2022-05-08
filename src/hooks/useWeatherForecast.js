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
  console.log('weatjerdata', weatherData);
  const currentDate = weatherData?.referenceTime?.substr(0, 10);
  console.log('currentDate', currentDate);
  const todaysWeatherData = weatherData.timeSeries.find(({ validTime }) =>
    validTime.includes(currentDate)
  );
  console.log('todaysWeatherData', todaysWeatherData);
  return todaysWeatherData;
};

export const useWeatherForecast = (type, coordinates) => {
  console.log('type, coor', type, coordinates);
  const forecastApi = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${coordinates.longitude}/lat/${coordinates.latitude}/data.json`;
  // const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=sv`;

  const { data, error } = useSWR(forecastApi, (url) => fetcher(url));

  console.log('error, data', error, data);
  if (type === 'todaysWeather') {
    // const todaysWeather = getTodaysWeather(data);
    return {
      todaysWeather: data?.timeSeries ? getTodaysWeather(data) : null,
      isLoading: !data && !error,
      isError: error,
    };
  } /* else {
    return {
      weatherForecast:
        data?.list && Object.entries(data).length
          ? data.list
              .filter((f) => f.dt_txt.match(/09:00:00/))
              .map(mapResponseProperties)
          : null,
      isLoading: !data && !error,
      isError: error,
    };
  } */
};
