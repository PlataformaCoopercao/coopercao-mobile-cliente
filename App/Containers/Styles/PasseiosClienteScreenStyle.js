import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

const {width: WIDTH} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  inputContainer: {
    marginTop: 10
  },
  inputText: {
    position: 'relative',
    top: 0,
    left: 23
  },
  input: {
    width: WIDTH - 55,
    height: 35,
    fontSize: 25,
    borderColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 5,
    borderWidth: 3,
    color: 'rgba(0, 0, 0, 1)',
    marginHorizontal: 25,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center'
  },
  largeInput: {
    width: WIDTH - 55,
    alignSelf: 'center',
    marginHorizontal: 25,
    backgroundColor: 'lightgrey',
    borderColor: 'black'
  },
  espalhar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  botaoConfirma: {
    backgroundColor: 'red',
    width: 120,
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    justifyContent: 'center'
  },
  botaoCancela: {
    backgroundColor: 'gray',
    width: 120,
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    justifyContent: 'center'
  }

})
