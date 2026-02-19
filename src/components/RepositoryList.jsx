import React, { useState, useRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  // ActivityIndicator,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
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
  searchContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.backgroundAppBar,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    fontSize: 14,
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

const RepositoryListHeader = ({
  order,
  onOrderChange,
  searchKeyword, // This is the value from the parent
  onSearchChange, // This is the setter from the parent
}) => {
  // Create local state so the typing is "instant" and doesn't trigger the List
  const [localValue, setLocalValue] = useState(searchKeyword);

  const onChange = (text) => {
    setLocalValue(text);
    onSearchChange(text); // Pass it up to the parent's debouncer
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search repositories..."
          value={localValue}
          onChangeText={onChange}
          style={styles.searchInput}
          placeholderTextColor={theme.colors.textGrey}
        />
      </View>
      <View style={styles.orderHeader}>
        <Text style={styles.orderLabel}>Sort by</Text>
        <Picker
          selectedValue={order}
          onValueChange={(value) => onOrderChange(value)}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          dropdownIconColor={theme.colors.textBlack}
          mode="dropdown"
        >
          {ORDER_OPTIONS.map((opt) => (
            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
          ))}
        </Picker>
      </View>
    </>
  );
};

export class RepositoryListContainer extends React.Component {
  shouldComponentUpdate(nextProps) {
    // Only re-render if an actual prop changed (not just repositories data)
    return (
      this.props.order !== nextProps.order ||
      this.props.searchKeyword !== nextProps.searchKeyword ||
      this.props.repositories?.edges.length !==
        nextProps.repositories?.edges.length
    );
  }

  renderHeader = () => {
    const {
      order,
      onOrderChange,
      searchKeyword,
      onSearchChange,
      searchInputRef,
    } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        onOrderChange={onOrderChange}
        searchKeyword={searchKeyword}
        onSearchChange={onSearchChange}
        searchInputRef={searchInputRef}
      />
    );
  };

  render() {
    const {
      repositories,
      navigate,
      order,
      onOrderChange,
      searchKeyword,
      onSearchChange,
    } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        // Pass the JSX directly. FlatList handles this much better.
        ListHeaderComponent={
          <RepositoryListHeader
            order={order}
            onOrderChange={onOrderChange}
            searchKeyword={searchKeyword}
            onSearchChange={onSearchChange}
          />
        }
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem
            item={item}
            onPress={() => navigate(`/repository/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderConfig =
    ORDER_OPTIONS.find((o) => o.value === order) ?? ORDER_OPTIONS[0];
  const variables = {
    orderBy: orderConfig.orderBy,
    orderDirection: orderConfig.orderDirection,
    searchKeyword: debouncedSearchKeyword,
  };

  const { repositories, error } = useRepositories(variables);

  // const showFullLoader = loading && !repositories;

  // if (showFullLoader) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color={theme.colors.darkRed} />
  //       <Text>Loading repositories...</Text>
  //     </View>
  //   );
  // }

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
      searchKeyword={searchKeyword}
      onSearchChange={setSearchKeyword}
      navigate={navigate}
      searchInputRef={searchInputRef}
    />
  );
};

export default RepositoryList;
