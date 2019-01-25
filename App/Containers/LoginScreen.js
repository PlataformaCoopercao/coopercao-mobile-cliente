import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Content, Body, Text, Left, Right,
  Button, List, Spinner, Input, ListItem, Thumbnail, InputGroup
} from 'native-base'
import { Font } from "expo"
import { strings } from '../locales/i18n';
import I18n from 'react-native-i18n';
import * as firebase from 'firebase';
// Styles

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      email: '',
      senha: '',
      remount: 1
    };
  }

  // required to load native-base font in expo
  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  forceRemount() {
    this.setState({
      remount: this.state.remount + 1
    });
    this.componentDidMount();
    this.render();
  }

  setLocalePT(){
    I18n.locale = 'pt-BR';
    this.forceRemount();
    console.log(I18n.currentLocale())
  }

  setLocaleEN(){
    I18n.locale = 'en';
    this.forceRemount();
    console.log(I18n.currentLocale())
  }

  onEntrarPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha)
    .then(() => {
      this.props.navigation.navigate('MenuClienteScreen');
    }, (error) => {
      Alert.alert(error.message);
    });
  }

  render () {
    const {navigate} = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container>
        <Header style={{ backgroundColor: 'red', marginTop: 15 }}/>
        <Content>
          <Spinner color='red' />
        </Content>
      </Container>
      );
    } else {
    return (
        <Container>
          <Header style={{ backgroundColor: 'white', marginTop: 22}}>
          <Left>
      <Button onPress={() => this.setLocalePT()} style={{ backgroundColor:'red' }}>
      <Text>{'PT'}</Text>
      </Button>
      </Left>
      <Right>
      <Button onPress={() => this.setLocaleEN()} style={{ backgroundColor:'red' }}>
      <Text>{'EN'}</Text>
      </Button>
      </Right>
          </Header>
          <Content style={{alignContent:"stretch"}}>
          <Thumbnail style={{alignSelf:'center', height: 250, width: 250, marginVertical: 15}} source={require('../Images/logoCoopercao.png')}/>
        <List>
          <ListItem>
              <InputGroup>
                <Input placeholder={strings('LoginScreen.email')} keyboardType='email-address' autoCorrect={false} 
                autoCapitalize='none' onChangeText={(text) => {this.setState({email: text})}} />
              </InputGroup>
          </ListItem> 
          <ListItem>
              <InputGroup>
                <Input placeholder={strings('LoginScreen.password')} autoCapitalize='none' autoCorrect={false}
                  secureTextEntry={true} onChangeText={(text) => {this.setState({senha: text})}}/>
              </InputGroup>
          </ListItem>
      </List>
      <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }} onPress={this.onEntrarPress}>
      <Text>{strings('LoginScreen.enter')}</Text>   
      </Button>
      <Left>
      <Button onPress={() => navigate('CadastroClienteScreen')} style={{ marginTop: 5, marginBottom: 5, backgroundColor:'gray' }}>
      <Text>{strings('LoginScreen.firstAccess')}</Text>
      </Button>
      </Left>
      <Body/>
      <Right>
      <Button style={{ marginTop: 5, marginBottom: 5, backgroundColor:'gray' }}>
      <Text>{strings('LoginScreen.forgotPassword')}</Text>
      </Button>
      </Right>
        </Content>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)