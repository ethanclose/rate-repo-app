import { Pressable, StyleSheet } from 'react-native';
import CountRow from './CountRow';
import ItemTitleRow from './ItemTitleRow';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const RepositoryItem = ({ item, onPress, children }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      testID="repositoryItem"
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: onPress && pressed ? '#e1e4e8' : 'white' },
      ]}
    >
      <ItemTitleRow item={item} />
      <CountRow item={item} />
      {children}
    </Pressable>
  );
};

export default RepositoryItem;
