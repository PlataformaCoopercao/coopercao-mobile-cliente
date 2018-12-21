import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  botao: {
    alignSelf: 'center',
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: 'red',
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center'
  }
})
