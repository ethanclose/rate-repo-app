import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  pressable: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: '100%', 
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.heading, 
    fontWeight: theme.fontWeights.bold,
  }
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Pressable>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default AppBarTab;