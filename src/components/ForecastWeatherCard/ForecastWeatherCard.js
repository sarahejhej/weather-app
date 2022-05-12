import React from 'react';

import ForecastTable from '../ForecastTable/ForecastTable';
import { useWeatherForecast } from '../../hooks/useWeatherForecast';

const ForecastWeatherCard = ({ coordinates }) => {
  const { forecast } = useWeatherForecast('forecast', coordinates);

  return <ForecastTable forecast={forecast} />;
};

export default ForecastWeatherCard;