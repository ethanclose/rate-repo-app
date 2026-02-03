import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const formatSingleValue = (value) => {
  if (value >= 1000) {
    return `${(Math.round(value / 100) / 10).toFixed(1)}k`;
  }

  return String(value);
};

const Count = ({ text, count }) => {
  return (
    <View style={styles.container}>
      <Text color="textPrimary" fontWeight="bold">
        {formatSingleValue(count)}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export default Count;
