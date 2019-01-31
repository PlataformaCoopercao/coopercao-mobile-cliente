import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-native'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Button, List, Footer, FooterTab, Item, Input,
  Picker, Spinner, Thumbnail, ListItem, InputGroup
} from 'native-base'
import { Font } from "expo"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';
// Styles
import { Colors } from '../Themes';


class CadastroDogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      age: '0',
      gender: '0',
      habits: '0',
      interaction_dogs: '0',
      interaction_external: '0',
      interaction_people: '0',
      name: '0',
      obs: '0',
      owner: '0',
      owner_data: '0',
      photoUrl: '0',
      port: 'mini',
      portLabel: 'não definido',
      race: '0',
      vet_name: '0',
      vet_phone: '0',
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'mini',
      results: {
        items: [],
      },
    };
  }

  //onValueChange(value: string) {
  //  this.setState({
  //    selected: value
  //  });
  //}


  // required to load native-base font in expo
  async componentWillMount() {
    this.getClientData ();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }
  
  getClientData () {
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getClient', {id: firebase.auth().currentUser.uid})
    .then(response => this.setState({owner_data: response.data})).catch((error) => {Alert.alert(error.message)});
    this.forceUpdate()
  }

  onCadastrarPress = () => {
    this.submit();
  }

//MUITOS PARAMETROS EM FALTA!
  submit() {
    let dog = {}
    dog.age = this.state.age,
    dog.gender = 'M',
    dog.habits = 'Normal',
    dog.interaction_dogs = 'normal',
    dog.interaction_external = 'normal',
    dog.interaction_people = 'normal',
    dog.name = this.state.name,
    dog.obs = 'normal',
    dog.owner_id = firebase.auth().currentUser.uid,
    dog.owner_data = this.state.owner_data,
    dog.photoUrl = 'https://static.thenounproject.com/png/151542-200.png',
    dog.port = this.state.port,
    dog.race = this.state.race,
    dog.vet_name = 'João Carlos',
    dog.vet_phone = '+558166666666';
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/addDog';
    axios.post(url, dog)
      .then(() => {
        Alert.alert(strings("General.success"));
        this.props.navigation.navigate('MenuClienteScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const uri = "https://static.thenounproject.com/png/151542-200.png";
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
          <Header style={{ backgroundColor: 'red', marginTop: 22 }}>
            <Left>
              <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MeusCachorrosScreen')} />
            </Left>
            <Body>
              <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('CadastroDogScreen.dogRegister')}</Title>
            </Body>
          </Header>
          <Content padder style={{ backgroundColor: 'white', alignContent: "stretch" }}>
            <List>
              <ListItem style={{ alignSelf: 'center' }}>
                <Thumbnail large source={{ uri: uri }} />
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHName')} onChangeText={(text) => { this.setState({ name: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHAge')} onChangeText={(text) => { this.setState({ age: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHRace')} onChangeText={(text) => { this.setState({ race: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Text>{strings('CadastroDogScreen.size')}</Text>
                <Picker
                  iosHeader={strings('CadastroDogScreen.chooseOne')}
                  mode="dropdown"
                  selectedValue={this.state.port}
                  onValueChange={(value) => {
                    //this.onValueChange.bind(this);
                    this.setState({ port: value, portLabel: value.label });
                    }} >
                  <Item label={strings('CadastroDogScreen.mini')} value="mini" />
                  <Item label={strings('CadastroDogScreen.little')} value="little" />
                  <Item label={strings('CadastroDogScreen.medium')} value="medium" />
                  <Item label={strings('CadastroDogScreen.big')} value="big" />
                  <Item label={strings('CadastroDogScreen.giant')} value="giant" />
                </Picker>
              </ListItem>
            </List>
            <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor: 'red' }}
              onPress={this.onCadastrarPress}>
              <Text>{strings('CadastroDogScreen.register')}</Text>
            </Button>
          </Content>
          <Footer style={{ backgroundColor: 'red' }}>
            <FooterTab style={{ backgroundColor: 'red' }}>
              <Button onPress={() => navigate('MenuClienteScreen')}>
                <Icon name='md-person' type='Ionicons' style={{ color: 'white' }} />
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
export default connect(mapStateToProps, mapDispatchToProps)(CadastroDogScreen)
