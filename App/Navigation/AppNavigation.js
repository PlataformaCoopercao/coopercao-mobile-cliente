import { createStackNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import LoginScreen from  '../Containers/LoginScreen.js'
import PasseadorPasseiosScreen from '../Containers/PasseadorPasseiosScreen.js'
import PasseiosLivresScreen from '../Containers/PasseiosLivresScreen.js'
import CadastroDogScreen from '../Containers/CadastroDogScreen.js'
import HistoricoPasseadorScreen from '../Containers/HistoricoPasseadorScreen.js'
import HistoricoClienteScreen from '../Containers/HistoricoClienteScreen.js'
import ExtratoScreen from '../Containers/ExtratoScreen.js'
import PasseioScreen from '../Containers/PasseioScreen.js'
import PasseioAvulsoScreen from '../Containers/PasseioAvulsoScreen.js'
import FeedbackScreen from '../Containers/FeedbackScreen.js'
import AvaliacaoScreen from '../Containers/AvaliacaoScreen.js'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen },
  PasseadorPasseiosScreen: { screen: PasseadorPasseiosScreen },
  PasseiosLivresScreen: { screen: PasseiosLivresScreen},
  CadastroDogScreen: { screen: CadastroDogScreen},
  HistoricoPasseadorScreen: { screen: HistoricoPasseadorScreen},
  HistoricoClienteScreen: { screen: HistoricoClienteScreen},
  ExtratoScreen: { screen: ExtratoScreen },
  PasseioScreen: { screen: PasseioScreen},
  PasseioAvulsoScreen: { screen: PasseioAvulsoScreen},
  FeedbackScreen: { screen: FeedbackScreen},
  AvaliacaoScreen: { screen: AvaliacaoScreen},
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
