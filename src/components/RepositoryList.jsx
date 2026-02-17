import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
    width: '80%',
    alignSelf: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem
          item={item}
          onPress={() => navigate(`/repository/${item.id}`)}
        />
      )}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  if (loading && !repositories) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          style={{ color: theme.colors.darkRed }}
        />
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text color="darkRed">Error: {error.message}</Text>
      </View>
    );
  }

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
