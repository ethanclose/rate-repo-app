import { Pressable, StyleSheet } from 'react-native';
import CountRow from './CountRow';
import ItemTitleRow from './ItemTitleRow';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const RepositoryItem = ({ item }) => {
  const onPress = () => {
    console.log('pressed');
  };

  return (
    <Pressable
      onPress={onPress}
      testID="repositoryItem"
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: pressed ? '#e1e4e8' : 'white' },
      ]}
    >
      <ItemTitleRow item={item} />
      <CountRow item={item} />
    </Pressable>
  );
};

export default RepositoryItem;
