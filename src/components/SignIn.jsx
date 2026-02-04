import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.appBar.height,
    paddingBottom: 20,
    alignContent: 'center',
  },
});

const SignIn = () => {
  return (
    <View style={styles.container}>
      <Text color="green" fontWeight="bold" fontSize="medium">
        The sign-in view
      </Text>
    </View>
  );
};

export default SignIn;
