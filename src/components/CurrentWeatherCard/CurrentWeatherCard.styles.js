import styled from '@emotion/styled';

export const CurrentWeatherContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const WeatherIcon = styled('i')((props) => ({
  fontSize: props.fontSize,
  color: 'lightblue',
}));
