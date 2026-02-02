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
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View horizontal>
        <AppBarTab>
          Repositories
        </AppBarTab>
      </View>
    </View>
  );
};

export default AppBar;