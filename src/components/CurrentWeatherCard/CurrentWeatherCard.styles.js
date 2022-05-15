import styled from '@emotion/styled';

export const CurrentWeatherContainer = styled('section')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

export const WeatherIcon = styled('i')((props) => ({
  fontSize: props.fontSize,
  color: props.color,
}));
