import { View, Image, StyleSheet } from 'react-native';
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0, 
  },
  imageContainer: {
    padding: 10,
    flexDirection: 'column',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'left',
    padding: 10,
    gap: 5,
  },
  image: {
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 5, 
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start', 
    marginTop: 8,
  },
  languageText: {
    color: 'white',
  }
});


const LanguageBox = ({ text }) => (
  <View style={styles.languageContainer}>
    <Text style={styles.languageText}>{text}</Text>
  </View>
);

const ItemTitleRow = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={{uri: item.ownerAvatarUrl}} 
        />
      </View>
      <View style={styles.textContainer}>
        <Text color='primary' fontWeight='bold'>
          {item.fullName}
        </Text>
        <Text color='textSecondary'>
          {item.description}
        </Text>
        <LanguageBox text={item.language} />
      </View>
    </View>

  )
}

export default ItemTitleRow