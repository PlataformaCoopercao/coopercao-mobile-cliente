import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
   CardItem, List, Footer, FooterTab, Badge, Spinner, Form, Item, Label, Input, ListItem, Thumbnail, InputGroup
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { StackNavigator, NavigationActions } from "react-navigation"
import AuthService from '../../src/services/Auth'
import firebase from 'firebase'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      user: firebase.user | null
    };
  }

  // required to load native-base font in expo
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  async componentDidMount() {
    AuthService.subscribeAuthChange(user => this.setState({ user }));
  }

  render () {
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
    }
    else if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text>You are logged in!</Text>
          <Button onPress={AuthService.logout} title='Logout' />
        </View>
      );
    }
     else {
    return (
        // <KeyboardAvoidingView behavior='position'>
        //   <View style={styles.logoContainer} >
        //     <Image source = {Images.logoCoopercao} style={styles.logo}/>
        //   </View>

        //   <View style={styles.inputContainer}>
        //     <Text style={styles.inputText}>Login</Text>
        //     <TextInput placeholder={'Email'} placeholderTextColor={Colors.coal} style={styles.input}/>
        //   </View>

        //   <View style={styles.inputContainer}>
        //   <Text style={styles.inputText}>Senha</Text>
        //     <TextInput style={styles.input}
        //      placeholder={'senha'} secureTextEntry={true} placeholderTextColor={Colors.coal}/>
        //   </View>
          
        //   <TouchableOpacity style ={styles.btnEntrar} >
        //     <Text style={styles.textEntrar}>Entrar</Text>
        //   </TouchableOpacity>
        //   <View>
        //   <TouchableOpacity style ={styles.btnOutros} >
        //     <Text style={styles.textOutros}>Primeiro Acesso</Text>
        //   </TouchableOpacity>
        //   <TouchableOpacity style ={styles.btnOutros} >
        //     <Text style={styles.textOutros}>Esqueci minha senha</Text>
        //   </TouchableOpacity>
        //   </View>
        // </KeyboardAvoidingView>
        <Container>
          <Content style={{alignContent:"stretch"}}>
          <Thumbnail style={{alignSelf:'center', height: 250, width: 250}} source={require('../Images/logoCoopercao.png')}/>
        <List>
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('LoginScreen.email')} />
              </InputGroup>
          </ListItem> 
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('LoginScreen.password')} secureTextEntry={true} />
              </InputGroup>
          </ListItem>
      </List>
      <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }} onPress={() => navigate('MenuClienteScreen')}>
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
      <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'blue' }} onPress={() => AuthService.loginWithFacebook}>
      <Text>Entrar com o Facebook</Text>   
      </Button>
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
