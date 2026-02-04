import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    flexDirection: 'row',
    height: theme.appBar.height,
    paddingBottom: 10,
    alignContent: 'center',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/SignIn">Sign In</AppBarTab>
        <AppBarTab to="/BMI">BMI</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
