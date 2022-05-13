import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import CssBaseline from '@mui/material/CssBaseline';

import WeatherDetailsPage from './containers/WeatherDetailsPage/WeatherDetailsPage';
import Loader from './components/Loader/Loader';

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
          fetcher: fetcher,
        }}
      >
        <CssBaseline />
        <WeatherDetailsPage />
      </SWRConfig>
    </Suspense>
  );
}

export default App;
