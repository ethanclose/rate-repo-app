import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from 'react-router-native';
import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import theme from '../theme';

const ReviewItem = ({ review, onDelete, onViewRepository }) => {
  const formattedDate = new Date(review.createdAt).toLocaleDateString();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review.id);
    }
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingBadge}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
        <View style={styles.actionButtons}>
          <View style={styles.buttonContainer}>
            <Button
              title="View repository"
              onPress={() => onViewRepository(review.repository.id)}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Delete"
              onPress={handleDelete}
              color={theme.colors.danger}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const UserReviews = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const reviews = data?.me?.reviews?.edges.map((edge) => edge.node) || [];

  const handleDelete = async (id) => {
    try {
      await deleteReview({
        variables: { id },
      });
      refetch();
    } catch (err) {
      console.log('Error:', err);
      alert('Error: Failed to delete review');
    }
  };

  const handleViewRepository = (repositoryId) => {
    navigate(`/repository/${repositoryId}`);
  };

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          onDelete={handleDelete}
          onViewRepository={handleViewRepository}
        />
      )}
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
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonContainer: {
    marginRight: 8,
    flex: 1,
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
