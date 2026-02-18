import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';

import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  resetButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.textSecondary || '#666',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: theme.colors.textSecondary || '#666',
    fontSize: 16,
    fontWeight: '600',
  },
});

const validationSchema = yup.object().shape({
  owner: yup.string().required('Owner name is required'),
  name: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating cannot be more than 100')
    .required('Repository rating is required'),
  text: yup.string(),
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  text: '',
};

export const ReviewForm = ({ onSubmit }) => {
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
            formik.touched.owner && formik.errors.owner && styles.inputError,
          ]}
          placeholder="Owner"
          placeholderTextColor="#999"
          value={formik.values.owner}
          onChangeText={formik.handleChange('owner')}
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={formik.handleBlur('owner')}
        />
        {formik.touched.owner && formik.errors.owner && (
          <Text style={{ color: theme.colors.darkRed }}>
            {formik.errors.owner}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            formik.touched.name && formik.errors.name && styles.inputError,
          ]}
          placeholder="Name"
          placeholderTextColor="#999"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
          autoCapitalize="none"
          onBlur={formik.handleBlur('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={{ color: theme.colors.darkRed }}>
            {formik.errors.name}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            formik.touched.rating && formik.errors.rating && styles.inputError,
          ]}
          placeholder="Rating"
          placeholderTextColor="#999"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
          autoCapitalize="none"
          onBlur={formik.handleBlur('rating')}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: theme.colors.darkRed }}>
            {formik.errors.rating}
          </Text>
        )}
        <TextInput
          style={[styles.input, { minHeight: 100 }]} // Give it some height
          placeholder="Review"
          multiline
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          onBlur={formik.handleBlur('text')}
        />
        <Pressable style={styles.button} onPress={formik.handleSubmit}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </Pressable>
        <Pressable style={styles.resetButton} onPress={formik.handleReset}>
          <Text style={styles.resetButtonText}>Reset Form</Text>
        </Pressable>
      </View>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { owner, name, rating, text } = values;

    try {
      const data = await createReview({
        owner,
        name,
        rating: Number(rating),
        text,
      });
      if (data?.createReview) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log('Create review fail:', e.message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
