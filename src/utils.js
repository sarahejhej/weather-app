export const getIconColor = (temperature) => {
  return Math.round(temperature) < 10 ? '#B9DCF2' : '#FFA585';
};
