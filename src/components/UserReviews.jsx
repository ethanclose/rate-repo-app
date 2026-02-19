import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import theme from '../theme';

const ReviewItem = ({ review }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No reviews yet</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  reviewContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
  },
  ratingBadge: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  contentContainer: {
    flex: 1,
  },
  repositoryName: {
    fontSize: theme.fontSizes.small,
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  date: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textGrey,
    marginBottom: 4,
  },
  reviewText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
  },
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textGrey,
  },
});

export default UserReviews;
