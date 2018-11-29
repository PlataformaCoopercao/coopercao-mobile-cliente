import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
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
import CadastroClienteScreen from '../Containers/CadastroClienteScreen'
import PacotesPasseioScreen from '../Containers/PacotesPasseioScreen'
import MenuClienteScreen from '../Containers/MenuClienteScreen.js'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createBottomTabNavigator({
  LoginScreen: { screen: LoginScreen },
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
  CadastroClienteScreen: { screen: CadastroClienteScreen},
  PacotesPasseioScreen: {screen: PacotesPasseioScreen},
  MenuClienteScreen : {screen: MenuClienteScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
