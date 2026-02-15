import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useEffect } from 'react';

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const doSignOut = async () => {
      try {
        await authStorage.removeAccessToken();
        navigate('/SignIn');
        await apolloClient.resetStore();
      } catch {
        console.log(
          'ResetStore aborted as expected, but cache is cleared. Thanks AI for helping me fix this. ;)',
        );
      }
    };

    doSignOut();
  }, [authStorage, apolloClient, navigate]);

  return null;
};

export default SignOut;
