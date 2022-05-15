import React from 'react';
import PropTypes from 'prop-types';

import ForecastTable from '../ForecastTable/ForecastTable';
import { useWeatherForecast } from '../../hooks/useWeatherForecast';

const ForecastWeatherCard = ({ coordinates }) => {
  const { data: forecast } = useWeatherForecast('forecast', coordinates);

  return <ForecastTable forecast={forecast} />;
};

export default ForecastWeatherCard;

ForecastWeatherCard.propTypes = {
  coordinates: PropTypes.object.isRequired,
};
