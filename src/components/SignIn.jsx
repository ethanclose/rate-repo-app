import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.appBar.height,
    paddingBottom: 20,
    alignContent: 'center',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  return (
    <View>
      <View style={styles.container}>
        <Text color="green" fontWeight="bold" fontSize="medium">
          The sign-in view
        </Text>
      </View>
      <View>
        <TextInput
          placeholder="username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        <TextInput
          placeholder="password"
          secureTextEntry="true"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        <Pressable onPress={formik.handleSubmit}>
          <Text>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
