import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Button, List, Input, Spinner, Thumbnail, ListItem, InputGroup
} from 'native-base'
import { strings } from '../locales/i18n';
import { Font, AppLoading, Expo } from "expo"
import axios from 'axios';
// Styles
import { Colors } from '../Themes';


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
      telefone: '',
      cpf: '',
      dataDeNascimento: ''


    };
  }
  //onValueChange(value: string) {
  // this.setState({
  //    selected: value
  //  });
  //}

  onCadastrarPress = () => {
    if(this.state.CEP.length < 1 || this.state.rua.length < 1 || this.state.numero.length < 1 || this.state.bairro < 1 
      || this.state.nome.length < 1 || this.state.phoneNumber < 1 || this.state.email.length < 1) {
        Alert.alert(strings("CadastroClienteScreen.completeAllFields"));
        return;
      }
    if (this.state.senha !== this.state.senhaConfirmacao) {
      Alert.alert(strings("CadastroClienteScreen.unmatchedPasswords"));
      return;
    } else if (this.state.senha.length < 6) {
      Alert.alert(strings("CadastroClienteScreen.passwordMinLength"));
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
      collection.pass = this.state.senha,
      collection.birth_date = this.state.dataDeNascimento,
      collection.cpf = this.state.cpf,
      collection.phoneNumber = '+55' + this.state.telefone,
      collection.photoUrl = 'https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png',
      collection.email = this.state.email,
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
      //console.log(this.state.senha);
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
        <Container style={{backgroundColor:'white'}}>
          <Header style={{backgroundColor:'red', marginTop: 22}} />
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
                  <Input placeholder="CPF" keyboardType='numeric' autoCapitalize='none' autoCorrect={false}
                    onChangeText={(text) => { this.setState({ cpf: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input autoCapitalize='none' autoCorrect={false}
                    placeholder={strings("CadastroClienteScreen.birthDate")} onChangeText={(text) => { this.setState({ dataDeNascimento: text }) }} />
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