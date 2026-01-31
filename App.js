import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
export default function App() {

function getCurrentDate() {
  return new Date().toLocaleString();
}

  return (
    <View style={styles.container}>
      <Text>Hella world!</Text>

      <Text>Open up App.js to begin working on your app!</Text>
      <Text>Your system uses {Constants.platform.ios ? 'iOS' : Constants.platform.android ? 'Android' : 'Web'}!</Text>
      <Text>Current time: {getCurrentDate()}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
