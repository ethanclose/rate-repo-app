import { Text, View, StyleSheet } from 'react-native';
import CountRow from './CountRow'
import ItemTitleRow from './ItemTitleRow';

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
      <ItemTitleRow item={item} />
      <CountRow item={item} />
    </View>
  )
}

export default RepositoryItem