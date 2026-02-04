import React, { useState } from 'react'; // Added useState
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f1f3f5',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#24292e',
  },
});

const validationSchema = yup.object().shape({
  mass: yup
    .number()
    .min(1, 'Weight must be greater or equal to 1')
    .required('Weight is required'),
  height: yup
    .number()
    .min(0.5, 'Height must be greater or equal to 0.5')
    .required('Height is required'),
});

const getBodyMassIndex = (mass, height) => {
  return Math.round(mass / Math.pow(height, 2));
};

const BodyMassIndexForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { mass: '', height: '' },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Weight (kg)"
        style={styles.input}
        value={formik.values.mass}
        onChangeText={formik.handleChange('mass')}
        onBlur={formik.handleBlur('mass')}
      />
      {formik.touched.mass && formik.errors.mass && (
        <Text style={{ color: 'red' }}>{formik.errors.mass}</Text>
      )}
      <TextInput
        placeholder="Height (m)"
        style={styles.input}
        value={formik.values.height}
        onChangeText={formik.handleChange('height')}
        onBlur={formik.handleBlur('height')}
      />
      {formik.touched.height && formik.errors.height && (
        <Text style={{ color: 'red' }}>{formik.errors.height}</Text>
      )}
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>Calculate</Text>
      </Pressable>
    </View>
  );
};

const BodyMassIndexCalculator = () => {
  const [bmi, setBmi] = useState(null);

  const onSubmit = (values) => {
    const mass = parseFloat(values.mass);
    const height = parseFloat(values.height);

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      const result = getBodyMassIndex(mass, height);
      setBmi(result);
    }
  };

  return (
    <View>
      <BodyMassIndexForm onSubmit={onSubmit} />
      {bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Your BMI is: <Text style={{ fontWeight: 'bold' }}>{bmi}</Text>
          </Text>
        </View>
      )}
    </View>
  );
};

export default BodyMassIndexCalculator;
