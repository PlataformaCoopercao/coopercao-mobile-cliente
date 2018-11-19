import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from  '../Containers/LoginScreen.js'
import PasseadorPasseiosScreen from '../Containers/PasseadorPasseiosScreen.js'
import PasseiosLivresScreen from '../Containers/PasseiosLivresScreen.js'
import CadastroDogScreen from '../Containers/CadastroDogScreen.js'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  PasseadorPasseiosScreen: { screen: PasseadorPasseiosScreen },
  PasseiosLivresScreen: { screen: PasseiosLivresScreen},
  CadastroDogScreen: { screen: CadastroDogScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PasseiosLivresScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
