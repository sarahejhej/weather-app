import useSWR from 'swr';

export const useLocation = (coordinates, shouldFetch) => {
  const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=sv`;

  const { data, error } = useSWR(shouldFetch ? locationApi : null, {
    refreshInterval: 0,
  });

  return {
    location: data,
    isLoading: !data && !error,
    isError: error,
  };
};
