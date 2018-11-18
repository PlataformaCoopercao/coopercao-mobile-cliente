import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from  '../Containers/LoginScreen.js'
import PasseadorPasseiosScreen from '../Containers/PasseadorPasseiosScreen.js'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  PasseadorPasseiosScreen: { screen: PasseadorPasseiosScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'PasseadorPasseiosScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
