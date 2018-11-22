import { StyleSheet } from 'react-native'
import { ApplicationStyles, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  centered: {
    alignItems: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  leftText: {
    position: 'relative',
    top: 0,
    left: 15,
    fontSize: 15
  },
  rightText: {
    position: 'relative',
    top: 0,
    right: 15,
    fontSize: 15
  },
  padding: {
    padding: 10
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
    left: 0
  },
  textEntrar: {
    color: Colors.silver,
    fontSize: 20,
    textAlign: 'center'
  },
  btnFeedback: {
    width: 270,
    height: 45,
    backgroundColor: Colors.fire,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    top: 0,
    left: 0
  },
  btnInicio: {
    width: 100,
    height: 45,
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    top: 0,
    left: 0
  }
})