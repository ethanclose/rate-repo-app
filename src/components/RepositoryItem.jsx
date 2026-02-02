import { Text, View, StyleSheet } from 'react-native';
import CountRow from './CountRow'

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: 'darkred',
    fontSize: 24,
    fontWeight: '700',
  },
});



const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style = {styles.text}>
        Full name: {item.fullName}
      </Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <CountRow item={item}/>
    </View>
  )
}

export default RepositoryItem