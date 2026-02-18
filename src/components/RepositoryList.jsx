import { useState } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';
import theme from '../theme';

const ORDER_OPTIONS = [
  {
    value: 'latest',
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    value: 'highest',
    label: 'Highest rated',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    value: 'lowest',
    label: 'Lowest rated',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

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
  orderHeader: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.backgroundAppBar,
  },
  orderLabel: {
    color: theme.colors.textGrey,
    fontSize: 14,
    marginBottom: 4,
  },
  picker: {
    marginTop: 4,
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  pickerItem: {
    fontSize: 28,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ order, onOrderChange }) => (
  <View style={styles.orderHeader}>
    <Text style={styles.orderLabel}>Sort by</Text>
    <Picker
      selectedValue={order}
      onValueChange={(value) => onOrderChange(value)}
      style={styles.picker}
      itemStyle={styles.pickerItem}
      dropdownIconColor={theme.colors.textBlack}
    >
      {ORDER_OPTIONS.map((opt) => (
        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
      ))}
    </Picker>
  </View>
);

export const RepositoryListContainer = ({
  repositories,
  order,
  onOrderChange,
}) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ListHeaderComponent={
        <RepositoryListHeader order={order} onOrderChange={onOrderChange} />
      }
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
  const [order, setOrder] = useState('latest');

  const orderConfig =
    ORDER_OPTIONS.find((o) => o.value === order) ?? ORDER_OPTIONS[0];
  const variables = {
    orderBy: orderConfig.orderBy,
    orderDirection: orderConfig.orderDirection,
  };

  const { repositories, loading, error } = useRepositories(variables);

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

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      onOrderChange={setOrder}
    />
  );
};

export default RepositoryList;
