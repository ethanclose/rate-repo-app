import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab'

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
        <AppBarTab>
          Repositories
        </AppBarTab>
    </View>
  );
};

export default AppBar;