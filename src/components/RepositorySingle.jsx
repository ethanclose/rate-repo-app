import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const RepositorySingle = ({ itemId }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItem item={item} />
    </View>
  );
};

export default RepositorySingle;
