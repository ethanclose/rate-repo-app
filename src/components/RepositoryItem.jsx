import { View, StyleSheet } from 'react-native';
import CountRow from './CountRow';
import ItemTitleRow from './ItemTitleRow';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <ItemTitleRow item={item} />
      <CountRow item={item} />
    </View>
  );
};

export default RepositoryItem;
