import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textBlack,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextGrey: {
    color: theme.colors.textGrey,
  },
  colorTextBlack: {
    color: theme.colors.textBlack,
  },
  colorDarkRed: {
    color: theme.colors.darkRed,
  },
  colorOffWhite: {
    color: theme.colors.offWhite,
  },
  colorGreen: {
    color: theme.colors.green,
  },
  fontSizeSmall: {
    fontSize: theme.fontSizes.small,
  },
  fontSizeMedium: {
    fontSize: theme.fontSizes.medium,
  },
  fontSizeLarge: {
    fontSize: theme.fontSizes.large,
  },
  fontSizeBig: {
    fontSize: theme.fontSizes.big,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textBlack' && styles.colorTextBlack,
    color === 'textGrey' && styles.colorTextGrey,
    color === 'darkRed' && styles.colorDarkRed,
    color === 'green' && styles.colorGreen,
    color === 'offWhite' && styles.colorOffWhite,
    fontSize === 'snall' && styles.fontSizeSmall,
    fontSize === 'medium' && styles.fontSizeMedium,
    fontSize === 'large' && styles.fontSizeLarge,
    fontSize === 'big' && styles.fontSizeBig,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
