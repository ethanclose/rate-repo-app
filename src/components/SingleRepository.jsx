import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import { Button } from 'react-native';
import * as Linking from 'expo-linking';
import theme from '../theme';

const RepositoryInfo = ({ repository }) => {
  const handleOpenGithub = () => {
    Linking.openURL(repository.url);
  };

  return (
    <RepositoryItem item={repository}>
      <View style={styles.buttonContainer}>
        <Button
          title="Open in GitHub"
          onPress={handleOpenGithub}
          color={theme.colors.green}
        />
      </View>
    </RepositoryItem>
  );
};

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingBadge}>
        <Text style={styles.reviewText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 4 }, // Start with a small number for testing
    fetchPolicy: 'cache-and-network',
  });

  const onEndReach = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        first: 2,
      },
    });
  };

  if (loading && !data) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data?.repository;
  const reviews = repository?.reviews.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryInfo repository={repository} />
          <View style={styles.separator} />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.1}
    />
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
    padding: 5,
  },
  reviewContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  username: {
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  ratingBadge: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  contentContainer: {
    flexShrink: 1,
  },
  date: {
    color: theme.colors.textGrey,
    fontSize: theme.fontSizes.body,
    marginBottom: 8,
  },
  reviewText: {
    color: theme.colors.textBlack,
    fontSize: theme.fontSizes.body,
    lineHeight: 20,
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
});

export default SingleRepository;
