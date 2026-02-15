import { StyleSheet, Pressable } from 'react-native';
import { Link, useLocation } from 'react-router-native';
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
    fontSize: theme.fontSizes.medium,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ children, to, ...props }) => {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link to={to} component={Pressable} style={styles.pressable} {...props}>
      <Text style={{ ...styles.text, color: active ? 'white' : 'gray' }}>
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
