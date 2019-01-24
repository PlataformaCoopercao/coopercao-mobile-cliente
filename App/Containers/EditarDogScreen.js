import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Button, List, Footer, FooterTab, Item, Input,
   Picker, Spinner, Thumbnail, ListItem, InputGroup
} from 'native-base'
import { Font } from "expo"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import { Colors } from '../Themes';
import axios from 'axios';
import * as firebase from 'firebase';

class EditarDogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      dog: this.props.navigation.state.params.dogObj,
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'key0',
      results: {
        items: [],
      },
      uri: 'https://static1.squarespace.com/static/573b62e9746fb941c1458dcd/t/58bf1f27d1758e5d0c580379/1488921550603/who-we-are.jpg'
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  
  updateDog(){
    let dog = this.state.dog
    console.log(dog)
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/updateDog';
    axios.post(url, {dog})
      .then(() => {
        Alert.alert(strings("EditarDogScreen.updateDog"));
        this.props.navigation.navigate('MeusCachorrosScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }
  
  deleteDog(){
    let id = this.state.dog.id
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/deleteDog';
    axios.post(url, {id})
      .then(() => {
        Alert.alert(strings("EditarDogScreen.removeDog"));
        this.props.navigation.navigate('MeusCachorrosScreen');
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
    } else {
    return (
      <Container style={{backgroundColor:'red'}}>
          <Header style={{backgroundColor:'red', marginTop: 25}}>
          <Left>
            <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MeusCachorrosScreen')}/>
          </Left>
          <Body>
            <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('EditarDogScreen.editDog')}</Title>
          </Body>
        </Header>
        <Content padder style={{backgroundColor: 'white', alignContent:"stretch"}}>
        <List>
          <ListItem style={{alignSelf:'center'}}>
            <Thumbnail large source={{uri: this.state.uri}}/>
          </ListItem>
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHName')} onChangeText={(text) => { this.state.dog.name = text}} />
              </InputGroup>
          </ListItem> 
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHAge')} onChangeText={(text) => { this.state.dog.age = text }}/>
              </InputGroup>
          </ListItem>
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHRace')} onChangeText={(text) => { this.state.dog.race = text }}/>
              </InputGroup>
          </ListItem>
          <ListItem>
              <Text>{strings('CadastroDogScreen.size')}</Text>
              <Picker
                iosHeader={strings('CadastroDogScreen.chooseOne')}
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)} >
                  <Item label={strings('CadastroDogScreen.mini')} value="key0" />
                  <Item label={strings('CadastroDogScreen.little')} value="key1" />
                  <Item label={strings('CadastroDogScreen.medium')} value="key2" />
                  <Item label={strings('CadastroDogScreen.big')} value="key3" />
                  <Item label={strings('CadastroDogScreen.giant')} value="key4" />
              </Picker>
          </ListItem>
          <ListItem>
      <Button style={{ alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }} onPress={() => this.deleteDog()}>
      <Text>{strings('EditarDogScreen.remove')}</Text>
      </Button>
      <Button style={{ alignSelf: 'flex-end', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }} onPress={() => this.updateDog()}>
      <Text>{strings('EditarDogScreen.save')}</Text>   
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
export default connect(mapStateToProps, mapDispatchToProps)(EditarDogScreen)
