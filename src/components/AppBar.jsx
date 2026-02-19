import { View, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client/react';

import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.backgroundAppBar,
    flexDirection: 'row',
    height: theme.appBar.height,
    paddingBottom: 10,
    alignContent: 'center',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  // Clever trick thanks to AI to make sure this is a boolean
  const isLoggedIn = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {isLoggedIn ? (
          <>
            <AppBarTab to="/createReview">Add Review</AppBarTab>
            <AppBarTab to="/myReviews">My reviews</AppBarTab>
            <AppBarTab to="/SignOut">Sign Out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/SignIn">Sign In</AppBarTab>
            <AppBarTab to="/SignUp">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
