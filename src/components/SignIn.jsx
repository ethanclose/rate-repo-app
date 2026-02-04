import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import Text from './Text';
import theme from '../theme';
import * as yup from 'yup';

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
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters long') // <--- Min length here
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
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
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Log In</Text>
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
