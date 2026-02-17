import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client/react';
import * as Linking from 'expo-linking';
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
} from 'react-native';

import { GET_REPOSITORY } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
    padding: 5,
  },
});

const SingleRepository = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error.message}</Text>;

  const repository = data.repository;
  if (!repository) return <Text>Repository not found</Text>;

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

export default SingleRepository;
