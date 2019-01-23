import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
  CardItem, List, Footer, FooterTab, Badge, Form, Item, Label, Input,
  Picker, Spinner, Thumbnail, Col, Grid, Row, ListItem, InputGroup
} from 'native-base'
import { strings } from '../locales/i18n';
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
import * as firebase from 'firebase';
import axios from 'axios';
// Styles
import { Images, Colors } from '../Themes';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';

class CadastroClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      //selectedItem: undefined,
      //selected: 'key0',
      results: {
        items: [],
      },
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: '',
      CEP: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      telefone: ''

    };
  }
  //onValueChange(value: string) {
  // this.setState({
  //    selected: value
  //  });
  //}

  onCadastrarPress = () => {
    if (this.state.senha !== this.state.senhaConfirmacao) {
      Alert.alert(strings("CadastroClienteScreen.unmatchedPasswords"));
      return;
    }

    this.submit();
  }

  submit() {

    //FALTA CPF, BIRTH_DATE E PHOTOURL ?
    let address = {}
    address.cep = this.state.CEP,
      address.street = this.state.rua,
      address.num = this.state.numero,
      address.compl = this.state.complemento,
      address.district = this.state.bairro;
    let collection = {}
    collection.name = this.state.nome,
      collection.birth_date = '6.6.666',
      collection.cpf = '66666666666',
      collection.phoneNumber = '+55' + this.state.telefone,
      collection.photoUrl = 'https://i.pinimg.com/236x/c3/0a/c7/c30ac70d59b040b55dcd089a62bd69a6.jpg',
      collection.email = this.state.email,
      collection.pass = this.state.senha,
      collection.address = address;
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/registerClient';
    axios.post(url, collection)
      .then(() => {
        Alert.alert(strings("CadastroClienteScreen.successRegistration"));
        this.props.navigation.navigate('LoginScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
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

  render() {
    const { navigate } = this.props.navigation;
    const uri = "https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png";
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
        <Container style={{ backgroundColor: 'red'}}>
          <Header style={{ marginTop: 25, backgroundColor: 'red' }}>
            <Left>
              <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('LoginScreen')} />
            </Left>
            <Body>
              <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings("CadastroClienteScreen.registration")}</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content style={{ alignContent: "stretch", backgroundColor: "white" }}>
            <Thumbnail style={{ alignSelf: "center" }} large source={{ uri: uri }} />
            <List>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings("CadastroClienteScreen.name")} onChangeText={(text) => { this.setState({ nome: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder="Email" keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
                    onChangeText={(text) => { this.setState({ email: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input secureTextEntry={true} autoCapitalize='none' autoCorrect={false}
                    placeholder={strings("CadastroClienteScreen.password")} onChangeText={(text) => { this.setState({ senha: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input secureTextEntry={true} autoCapitalize='none' autoCorrect={false}
                    placeholder={strings("CadastroClienteScreen.confirmPassword")} onChangeText={(text) => { this.setState({ senhaConfirmacao: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings("CadastroClienteScreen.zipCode")} onChangeText={(text) => { this.setState({ CEP: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings("CadastroClienteScreen.street")} onChangeText={(text) => { this.setState({ rua: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder="Nº" onChangeText={(text) => { this.setState({ numero: text }) }} />
                  <Input placeholder={strings("CadastroClienteScreen.district")} onChangeText={(text) => { this.setState({ bairro: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings("CadastroClienteScreen.complement")} onChangeText={(text) => { this.setState({ complemento: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings("CadastroClienteScreen.contact")} onChangeText={(text) => { this.setState({ telefone: text }) }} />
                </InputGroup>
              </ListItem>
            </List>

            <ListItem>
            <Button onPress={() => navigate('LoginScreen')} style={{ alignSelf: 'flex-end', marginTop: 20, marginHorizontal: 40, marginBottom: 20, backgroundColor: 'red' }}>
              <Text>{strings("CadastroClienteScreen.cancel")}</Text>
            </Button>
            <Button onPress={this.onCadastrarPress} style={{ alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 40, marginBottom: 20, backgroundColor: 'red' }}>
              <Text>{strings("CadastroClienteScreen.register")}</Text>
            </Button>
            </ListItem>
          </Content>
        </Container>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(CadastroClienteScreen)