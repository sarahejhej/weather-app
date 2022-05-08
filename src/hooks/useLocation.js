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

export const useLocation = (coordinates) => {
  console.log('coor', coordinates);
  const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=sv`;

  const { data, error } = useSWR(locationApi, (url) => fetcher(url));

  console.log('error, data', error, data);
  // const todaysWeather = getTodaysWeather(data);
  return {
    location: data,
    isLoading: !data && !error,
    isError: error,
  };
};
