import React, { Component } from 'react'
import { Alert } from 'react-native'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
   CardItem, List, Footer, FooterTab, Badge, Form, Item, Label, Input,
   Picker, Spinner, Thumbnail, Col, Grid, Row, ListItem, InputGroup
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import { Images, Colors } from '../Themes';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './Styles/EditarClienteScreenStyle';
import axios from 'axios';
import * as firebase from 'firebase';

class EditarClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: firebase.auth().currentUser.uid,
      fontLoading: true, // to load font in expo
      nome: '',
      email: '',
      senha: '',
      senhaConfirmacao: '',
      cpf: '',
      dataNascimento: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      telefone: '',
      uri: '',
    };
  }

  getClientData () {
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getClient', {uid: firebase.auth().currentUser.uid})
    .then(response => this.setState({nome: response.data.name, uri: response.data.photoURL, email: response.data.email,
            cpf: response.data.cpf, dataNascimento: response.data.birth_date, cep: response.data.address.cep, rua: response.data.address.street,
            numero: response.data.address.num, bairro: response.data.address.area, complemento: response.data.address.compl,
            telefone: response.data.phoneNumber})).catch((error) => {Alert.alert(error.message)});
    this.update()
  }

  update () {
    if(this.state.uri == null || this.state.uri == ''){
      this.setState({uri: 'https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'})
    }
    this.forceUpdate()
  }

  onSalvarPress = () => {
    if (this.state.senha !== this.state.senhaConfirmacao) {
      Alert.alert("Senhas não estão iguais");
      return;
    }

    this.submit();
  }

  submit() {

    //FALTA SENHA ?
    let address = {}
      address.cep = this.state.cep,
      address.street = this.state.rua,
      address.num = this.state.numero,
      address.compl = this.state.complemento,
      address.area = this.state.bairro;
    let collection = {}
      collection.name = this.state.nome,
      collection.birth_date = this.state.dataNascimento,
      collection.cpf = this.state.CPF,
      collection.phoneNumber = this.state.telefone,
      collection.photoUrl = this.state.uri,
      collection.email = this.state.email,
      collection.pass = this.state.senha,
      collection.address = address;
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/updateClient';
    axios.post(url, collection)
      .then(() => {
        Alert.alert('Atualizado com sucesso!');
        this.props.navigation.navigate('PerfilClienteScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  
  // required to load native-base font in expo
  async componentWillMount() {
    this.getClientData();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  render () {
    const {navigate} = this.props.navigation;
    //const uri = "https://pbs.twimg.com/media/DahEyvzVQAAizMF.jpg";
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
        <Container>
          <Header style={{ backgroundColor: 'red'}}>
            <Left>
              <Icon name='arrow-back' onPress={() => navigate('PerfilClienteScreen')}/>
            </Left>
            <Body>
              <Title style={{color: Colors.snow}}>{strings('EditarClienteScreen.edit')}</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content style={{alignContent:"stretch"}}>
          <Thumbnail style={{alignSelf:"center"}} large source={{uri: this.state.uri}}/>
          <List>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.name')} onChangeText={(text) => { this.setState({ nome: text }) }}>
                {this.state.nome}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.email')} keyboardType='email-address' autoCapitalize='none' autoCorrect={false}
                onChangeText={(text) => { this.setState({ email: text }) }}>
                {this.state.email}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.password')} secureTextEntry={true} autoCapitalize='none' autoCorrect={false}
                onChangeText={(text) => { this.setState({ senha: text }) }}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.passwordTwo')} secureTextEntry={true} autoCapitalize='none' autoCorrect={false}
                onChangeText={(text) => { this.setState({ senhaConfirmacao: text }) }}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.cpf')} onChangeText={(text) => { this.setState({ cpf: text }) }}>
                {this.state.cpf}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.birthDate')} onChangeText={(text) => { this.setState({ dataNascimento: text }) }}>
                {this.state.dataNascimento}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.cep')} onChangeText={(text) => { this.setState({ cep: text }) }}>
                {this.state.cep}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.street')} onChangeText={(text) => { this.setState({ rua: text }) }}>
                {this.state.rua}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.number')} onChangeText={(text) => { this.setState({ numero: text }) }}>
                {this.state.numero}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.area')} onChangeText={(text) => { this.setState({ bairro: text }) }}>
                {this.state.bairro}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.complement')} onChangeText={(text) => { this.setState({ complemento: text }) }}>
                {this.state.complemento}</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder={strings('EditarClienteScreen.phone')} onChangeText={(text) => { this.setState({ telefone: text }) }}>
                {this.state.telefone}</Input>
              </InputGroup>
            </ListItem>
          </List>
          
          <ListItem>
            <Button onPress={() => navigate('PerfilClienteScreen')} style={{ alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
              <Text>{strings('EditarClienteScreen.cancel')}</Text>
            </Button>
            <Button onPress={this.onSalvarPress} style={{ alignSelf: 'flex-end', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
              <Text>{strings('EditarClienteScreen.save')}</Text>
            </Button>
          </ListItem>
          </Content>

          <Footer style={{ backgroundColor: 'red' }}>
            <FooterTab style={{ backgroundColor: 'red' }}>
              <Button onPress={() => navigate('PerfilClienteScreen')}>
              <Icon name='md-person' type='Ionicons' style={{color:'white'}}/>
                <Text style={{ color: 'white' }}>{strings('Footer.profile_button')}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditarClienteScreen)
