import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
   CardItem, List, Footer, FooterTab, Badge, Spinner, Form, Item, Label, Input, ListItem, Thumbnail, InputGroup
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { StackNavigator, NavigationActions } from "react-navigation"
import firebase from 'firebase'
import {  FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN,FIREBASE_DATABASE_URL,FIREBASE_PROJECT_ID,FIREBASE_STORAGE_BUCKET,FIREBASE_MESSENGER_SENDER_ID}
 from 'react-native-dotenv';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import styles from './Styles/LoginScreenStyle'


firebase.initializeApp({
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSENGER_SENDER_ID
});


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      user: firebase.user | null,
      email: '',
      password: '',
      error: '',
      logando: false,
      logado: false
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

  renderButtonOrLogando() {
    if (this.state.logando) {
      return <Text> Entrando... </Text>
    }
    return <View>
      <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }} onPress={() => this.onLoginPress()}>
      <Text>{strings('LoginScreen.enter')}</Text>   
      </Button>
    </View>
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
    //else if (this.state.user) {
    //  return (
    //    navigate('MenuClienteScreen')
    //  );
    //}
    else if (this.state.logado) {
      return (
        navigate('MenuClienteScreen')
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
                  <Input placeholder={strings('LoginScreen.email')} onChangeText={email => this.state.email = email}/>
              </InputGroup>
          </ListItem> 
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('LoginScreen.password')} secureTextEntry={true} onChangeText={pass => this.state.password = pass}/>
              </InputGroup>
          </ListItem>
      </List>
      <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }} onPress={() => }>
      <Text>{strings('LoginScreen.enter')}</Text>   
      </Button>
      <Button onPress={() => navigate('CadastroClienteScreen')} style={{marginBottom: 20 ,alignSelf: 'center', backgroundColor:'gray' }}>
      <Text>{strings('LoginScreen.firstAccess')}</Text>
      </Button>
      <Button style={{ alignSelf: 'center', backgroundColor:'gray' }}>
      <Text>{strings('LoginScreen.forgotPassword')}</Text>
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
