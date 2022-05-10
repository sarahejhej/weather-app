import { SWRConfig } from 'swr';
import CssBaseline from '@mui/material/CssBaseline';

import WeatherDetailsPage from './containers/WeatherDetailsPage/WeatherDetailsPage';

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = console.error(res.status);
    throw error;
  }

  return res.json();
};

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: fetcher,
      }}
    >
      <CssBaseline />
      <WeatherDetailsPage />
    </SWRConfig>
  );
}

export default App;
