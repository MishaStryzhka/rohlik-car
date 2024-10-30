export const getColorDrivingStyle = style => {
  switch (style) {
    case 'A':
      return '#59c959';
    case 'B':
      return '#ecd950';
    case 'C':
      return '#ff5151';
    case 'A/B':
      return 'linear-gradient(-8deg, #ecd950 45%, #59c959 55%)';
    case '0':
    default:
      return '#e0e0e0';
  }
};
