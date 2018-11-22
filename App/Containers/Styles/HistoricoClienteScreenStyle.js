import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

const {width: WIDTH} = Dimensions.get('window')

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  listContainer: {
    padding: 10,
    marginTop: 8,
    marginHorizontal: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.coal,
    backgroundColor: Colors.fire,
    alignItems: 'stretch',
 },
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C1C1C1',
  },
  containerFooter: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  textEntrar: {
    color: Colors.silver,
    fontSize: 20,
    textAlign: 'center'
  },
  btnEntrar: {
    width: 100,
    height: 45,
    backgroundColor: Colors.fire,
    justifyContent: 'center',

    borderRadius: 5,
    
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
 text: {
    color: Colors.snow
 },
  scrollViewContainer:{
    height: 100,

  }

})
