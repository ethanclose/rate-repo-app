import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import Constants from 'expo-constants';

console.log(`uri: ${Constants.expoConfig.extra.apolloUri}`);

const httpLink = new HttpLink({
  uri: Constants.expoConfig.extra.apolloUri,
  // uri: 'http://192.168.12.176:4000/graphql',
});

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
