import { Suspense } from 'react';
import { SWRConfig } from 'swr';
import CssBaseline from '@mui/material/CssBaseline';

import WeatherDetailsPage from './containers/WeatherDetailsPage/WeatherDetailsPage';
import Loader from './components/Loader/Loader';
import { ErrorBoundary } from './ErrorBoundary';

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      const error = {
        error: {
          code: 404,
          message: 'Not Found',
        },
      };
      return error;
    }
    throw new Error(res.status);
  }
  return res.json();
};

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: fetcher,
            suspense: true,
          }}
        >
          <CssBaseline />
          <WeatherDetailsPage />
        </SWRConfig>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
