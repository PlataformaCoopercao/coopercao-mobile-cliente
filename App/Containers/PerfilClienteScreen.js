import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Button, List, Footer, FooterTab,
  Spinner, Thumbnail, ListItem
} from 'native-base'
import { Font} from "expo"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import { Colors } from '../Themes';
import styles from './Styles/PerfilClienteScreenStyle.js';
import axios from 'axios';
import * as firebase from 'firebase';

class  PerfilClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: firebase.auth().currentUser.uid,
      fontLoading: true, // to load font in expo
      nome: '',
      email: '',
      endereco: '',
      telefone: '',
      datadeNasc: '',
      uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    };
  }

  getClientData () {
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getClient', {id: firebase.auth().currentUser.uid})
    .then(response => this.setState({nome: response.data.name, uri: response.data.photoURL, email: response.data.email, endereco: response.data.address.street, telefone: response.data.phoneNumber, dataDeNasc: response.data.birth_date})).catch((error) => {Alert.alert(error.message)});
    this.update()
  }

  update () {
    if(this.state.uri == null || this.state.uri == ''){
      this.setState({uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'})
    }
    this.forceUpdate()
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
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
  }

  render() {
    const {navigate} = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container>
          <Header />
          <Content>
            <Spinner color='red' />
          </Content>
        </Container>
      );
    } else {
      return (
        <Container style={{ backgroundColor: 'red' }}>
          <Header style={{ backgroundColor: 'red', marginTop: 25 }}>
            <Left>
              <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MenuClienteScreen')}/>
            </Left>
            <Body>
              <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('PerfilClienteScreen.profile')}</Title>
            </Body>
            <Right>

            </Right>
          </Header>
          <Content padder style={{ backgroundColor: 'white', alignContent: "stretch" }}>
            <List>
              <ListItem style={{ alignSelf: 'center', alignContent: 'center', flexDirection: 'column' }}>
                
                <Thumbnail style={{ height: 120, width: 120 }} large source={{ uri: this.state.uri }} />
                <Text>{this.state.nome}</Text>

              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>

                  <Text>{strings('PerfilClienteScreen.email')}{this.state.email}</Text>
                </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>

                  <Text>{strings('PerfilClienteScreen.address')}{this.state.endereco}</Text>

              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>

                  <Text>{strings('PerfilClienteScreen.homePhone')}{this.state.telefone}</Text>

              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>

                  <Text>{strings('PerfilClienteScreen.birthDate')}{this.state.dataDeNasc}</Text>

              </ListItem>
            </List>
            <Text>{""}</Text>
            <Button style={styles.botao} onPress={() => navigate('EditarClienteScreen')}>
              <Text>{"Editar"}</Text>
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PerfilClienteScreen)
