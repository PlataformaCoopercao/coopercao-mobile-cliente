import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from  '../Containers/LoginScreen.js'
import CadastroDogScreen from '../Containers/CadastroDogScreen.js'
import HistoricoClienteScreen from '../Containers/HistoricoClienteScreen.js'
import ExtratoScreen from '../Containers/ExtratoScreen.js'
import PasseioAvulsoScreen from '../Containers/PasseioAvulsoScreen.js'
import AvaliacaoScreen from '../Containers/AvaliacaoScreen.js'
import CadastroClienteScreen from '../Containers/CadastroClienteScreen.js'
import PacotesPasseioScreen from '../Containers/PacotesPasseioScreen.js'
import MenuClienteScreen from '../Containers/MenuClienteScreen.js'
import MeusCachorrosScreen from '../Containers/MeusCachorrosScreen.js'
import EditarDogScreen from '../Containers/EditarDogScreen.js'
import EditarClienteScreen from '../Containers/EditarClienteScreen.js'
// divisória
import PasseiosClienteScreen from '../Containers/PasseiosClienteScreen.js'
import PerfilClienteScreen from '../Containers/PerfilClienteScreen.js'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createBottomTabNavigator({
  LoginScreen: { screen: LoginScreen },
  CadastroDogScreen: { screen: CadastroDogScreen},
  HistoricoClienteScreen: { screen: HistoricoClienteScreen},
  ExtratoScreen: { screen: ExtratoScreen },
  PasseioAvulsoScreen: { screen: PasseioAvulsoScreen},
  AvaliacaoScreen: { screen: AvaliacaoScreen},
  CadastroClienteScreen: { screen: CadastroClienteScreen},
  PacotesPasseioScreen: {screen: PacotesPasseioScreen},
  MenuClienteScreen: {screen: MenuClienteScreen},
  MeusCachorrosScreen: {screen: MeusCachorrosScreen},
  EditarDogScreen: { screen: EditarDogScreen },
  EditarClienteScreen: { screen: EditarClienteScreen},
  PasseiosClienteScreen: { screen: PasseiosClienteScreen},
  PerfilClienteScreen: { screen: PerfilClienteScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
