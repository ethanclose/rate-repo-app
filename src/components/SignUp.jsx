import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';

import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: theme.colors.darkRed,
  },
  button: {
    backgroundColor: theme.colors.textBlack,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

const validationSchema = yup.object().shape({
  // prettier-ignore
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Password confirmation must match password'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUpForm = ({ onSubmit, submitError }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            formik.touched.username &&
              formik.errors.username &&
              styles.inputError,
          ]}
          placeholder="Username"
          placeholderTextColor="#999"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={formik.handleBlur('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.darkRed }}>
            {formik.errors.username}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            formik.touched.password &&
              formik.errors.password &&
              styles.inputError,
          ]}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          autoCapitalize="none"
          onBlur={formik.handleBlur('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.darkRed }}>
            {formik.errors.password}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation &&
              styles.inputError,
          ]}
          placeholder="Password confirmation"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={formik.values.passwordConfirmation}
          onChangeText={formik.handleChange('passwordConfirmation')}
          autoCapitalize="none"
          onBlur={formik.handleBlur('passwordConfirmation')}
        />
        {formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation && (
            <Text style={{ color: theme.colors.darkRed }}>
              {formik.errors.passwordConfirmation}
            </Text>
          )}
        {submitError && (
          <Text style={{ color: theme.colors.darkRed }}>{submitError}</Text>
        )}
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </View>
  );
};

// AI wrote this for me to handle the error message from the API
const getErrorMessage = (error) => {
  if (!error?.graphQLErrors?.length) return error?.message ?? 'Sign up failed';
  const gqlError = error.graphQLErrors[0];
  if (gqlError?.extensions?.code === 'USERNAME_TAKEN') {
    return gqlError.message;
  }
  return gqlError.message ?? error.message ?? 'Sign up failed';
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const [submitError, setSubmitError] = useState(null);

  const onSubmit = async (values) => {
    const { username, password } = values;
    setSubmitError(null);

    try {
      await createUser({ username, password });
      const data = await signIn({ username, password });
      if (data?.authenticate?.accessToken) {
        navigate('/');
      }
    } catch (e) {
      setSubmitError(getErrorMessage(e));
    }
  };

  return <SignUpForm onSubmit={onSubmit} submitError={submitError} />;
};

export default SignUp;
