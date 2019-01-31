import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Button,
   List, Footer, FooterTab, Input,
   Spinner, Thumbnail, ListItem, InputGroup
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import { Colors } from '../Themes';
import axios from 'axios';
import * as firebase from 'firebase';

class EditarClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: firebase.auth().currentUser.uid,
      fontLoading: true, // to load font in expo
      nome: '',
      cpf: '',
      dataNascimento: '',
      cep: '',
      rua: '',
      numero: '',
      bairro: '',
      complemento: '',
      telefone: '',
      uri: '',
      loaded: false
    };
  }

  getClientData () {
    this.setState({loaded:false});
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getClient', {id: firebase.auth().currentUser.uid})
    .then(response => this.setState({nome: response.data.name, uri: response.data.photoURL,
            cpf: response.data.cpf, dataNascimento: response.data.birth_date, cep: response.data.address.cep, rua: response.data.address.street,
            numero: response.data.address.num, bairro: response.data.address.district, complemento: response.data.address.compl,
            telefone: response.data.phoneNumber,loaded:true})).catch((error) => {Alert.alert(error.message)});
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
      Alert.alert(strings("General.passwordUnmatch"));
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
      address.district = this.state.bairro;
    let client = {}
      client.name = this.state.nome,
      client.birth_date = this.state.dataNascimento,
      client.cpf = this.state.CPF,
      client.phoneNumber = this.state.telefone,
      client.photoURL = this.state.uri,
      client.address = address;
    let collection = {}
      collection.id = firebase.auth().currentUser.uid,
      collection.client = client;
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/updateClient';
    axios.post(url, collection)
      .then(() => {
        Alert.alert(strings("General.success"));
        this.props.navigation.navigate('MenuClienteScreen');
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
    if (!this.state.loaded) {
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
        <Container style={{ backgroundColor: 'white'}}>
          <Header style={{ backgroundColor: 'red', marginTop: 25}}>
            <Left>
              <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('PerfilClienteScreen')}/>
            </Left>
            <Body>
              <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('EditarClienteScreen.edit')}</Title>
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
                <Input placeholder={strings('EditarClienteScreen.district')} onChangeText={(text) => { this.setState({ bairro: text }) }}>
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
