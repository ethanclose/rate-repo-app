import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import FlexboxExample from './FlexBoxExample';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
  text: {
    textAlign: 'center',
    color: 'darkgreen',
    fontSize: 24,
    fontWeight: '700',
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar /> 
      <RepositoryList />
    </View>
  );
};

export default Main;