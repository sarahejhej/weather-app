import useSWR from 'swr';

const convertResponse = (data) => {
  console.log('data', data);
  const mapped = {
    locality: data.locality,
    countryCode: data.countryCode,
  };
  return mapped;
};

export const useLocation = (coordinates) => {
  const locationApi = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&localityLanguage=sv`;

  const { data, error } = useSWR(locationApi, {
    refreshInterval: 0,
  });

  return {
    location: data ? convertResponse(data) : null,
    isLoadingLocation: !data && !error,
    isLocationError: error,
  };
};
