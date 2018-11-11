import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

const {width: WIDTH} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  logoContainer: {
    alignItems: 'center'
  },
  centered: {
    alignItems: 'center'
  },
  backgroundContainer: {
    flex: 1,
    width: 1,
    height: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: 'rgba(255, 255, 255, 0.7)',
    marginHorizontal: 25
  },
  btnEntrar: {
    width: 100,
    height: 45,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    top: 0,
    left: WIDTH - 130
  },
  textEntrar: {
    color: Colors.silver,
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: 10
  },
  inputText: {
    position: 'relative',
    top: 0,
    left: 30
  },
  btnOutros: {
    width: 155,
    height: 30,
    backgroundColor: Colors.frost,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    top: 0,
    left: 30
  },
  textOutros: {
    fontSize: 15,
    textAlign: 'center'
  }
})
