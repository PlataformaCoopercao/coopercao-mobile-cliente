import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Button, List, Footer, FooterTab, Spinner, Thumbnail, ListItem
} from 'native-base'
import { Font} from "expo"
import { strings } from '../locales/i18n';
// Styles
import { Colors } from '../Themes';
import styles from './Styles/MenuClienteScreenStyle.js';
import axios from 'axios';
import * as firebase from 'firebase';

class MenuClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: firebase.auth().currentUser.uid,
      fontLoading: true, // to load font in expo
      nome: '',
      uri: ''
    };
  }

  onLogoffPress = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('LoginScreen');
  }

  getClientData () {
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getClient', {id: firebase.auth().currentUser.uid})
    .then(response => this.setState({nome: response.data.name, uri: response.data.photoURL})).catch((error) => {Alert.alert(error.message)});
    this.forceUpdate()
  }

  // required to load native-base font in expo
  async componentDidMount(){
    this.getClientData();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false});
    this.forceUpdate()
  }

  

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container>
          <Header/>
          <Content>
            <Spinner color='red' />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={{ backgroundColor: 'red' }}>
          <Header style={{ backgroundColor: 'red', marginTop: 25}}>
            <Left>              
            </Left>
            <Body>
              <Title style={{marginHorizontal: 10, color: Colors.snow}}>{strings('MenuClienteScreen.menu')}</Title>
            </Body>
            <Right>
            </Right>
          </Header>
          <Content padder style={{ backgroundColor: 'white', alignContent: "stretch" }}>
            <List>
              <ListItem style={{ alignSelf: 'center', alignContent: 'center', flexDirection: 'column' }}>
                <Thumbnail style={{ height: 120, width: 120 }} large source={{ uri: this.state.uri }} />
                <Text>{strings('MenuClienteScreen.welcome')}{this.state.nome}</Text>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('PasseiosClienteScreen')}>
                  <Text>{strings('MenuClienteScreen.scheduledWalks')}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('PasseioAvulsoScreen')}>
                  <Text>{strings('MenuClienteScreen.askWalk')}</Text>
                </Button>
              </ListItem>
              {/* <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('PacotesPasseioScreen')}>
                  <Text>{strings('MenuClienteScreen.schedulePackages')}</Text>
                </Button>
              </ListItem> */}
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('MeusCachorrosScreen')}>
                  <Text>{strings('MenuClienteScreen.myDogs')}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('HistoricoClienteScreen')}>
                  <Text>{strings('MenuClienteScreen.walksHistory')}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('PerfilClienteScreen')}>
                  <Text>{strings('MenuClienteScreen.profile')}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={() => navigate('ExtratoScreen')}>
                  <Text>{strings('MenuClienteScreen.extract')}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao} onPress={this.onLogoffPress}>
                  <Text>{strings('MenuClienteScreen.logoff')}</Text>
                </Button>
              </ListItem>
            </List>
          </Content>
          <Footer style={{ backgroundColor: 'red' }}>
            <FooterTab style={{ backgroundColor: 'red' }}>
              <Button onPress={() => navigate('MenuClienteScreen')}>
              <Icon name='md-person' type='Ionicons' style={{color:'white'}}/>
                <Text style={{ color: 'white' }}>{strings('Footer.menu_button')}</Text>
              </Button>
              <Button onPress={() => navigate('HistoricoClienteScreen')}>
                <Icon name='md-calendar' style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>{strings('Footer.history_button')}</Text>
              </Button>
              <Button onPress={() => navigate('ExtratoScreen')}>
                <Icon name='ios-paper' style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>{strings('Footer.extract_button')}</Text>
              </Button>
              <Button onPress={() => navigate('PasseiosClienteScreen')}>
                <Icon name='walk' style={{ color: 'white' }} />
                <Text style={{ color: 'white' }}>{strings('Footer.walks_button')}</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      )
    }
  }
}



const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuClienteScreen)
