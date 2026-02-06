import { Platform } from 'react-native';

const theme = {
  colors: {
    textBlack: '#24292e',
    textGrey: '#586069',
    darkRed: '#f50905',
    offWhite: '#cbc3c1ff',
    green: '#0b8028',
    backgroundAppBar: '#c3c7caff',
  },
  fontSizes: {
    body: 14,
    small: 18,
    medium: 20,
    large: 24,
    big: 30,
  },
  appBar: {
    height: 100,
  },
  fonts: {
    main: Platform.select({
      android: 'System', // test with serif
      web: 'System', // test with serif
      ios: 'Arial', // test with Arial, American Typewriter
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400' as const,
    bold: '700' as const,
  },
  padding: {
    mini: 5,
    normal: 10,
    maxi: 20,
  },
};

export default theme;
