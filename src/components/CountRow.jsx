import { View, StyleSheet } from 'react-native';
import Count from './Count'

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 20,
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
  },
});

const CountRow = ({ item }) => {
  return (
    <View style={styles.container}>
      <Count text='Stars' count={item.stargazersCount}/>
      <Count text='Forks' count={item.forksCount}/>
      <Count text='Reviews' count={item.reviewCount}/>
      <Count text='Rating' count={item.ratingAverage}/>
    </View>
  )
}

export default CountRow