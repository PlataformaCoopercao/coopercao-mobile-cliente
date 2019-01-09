import React, { Component } from 'react'
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
import styles from './Styles/CadastroDogScreenStyles';
import { Dropdown } from 'react-native-material-dropdown';

class CadastroDogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'key0',
      results: {
          items: [],
      },
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
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

  render () {
    const {navigate} = this.props.navigation;
    const uri = "https://static1.squarespace.com/static/573b62e9746fb941c1458dcd/t/58bf1f27d1758e5d0c580379/1488921550603/who-we-are.jpg";
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
          <Header style={{backgroundColor:'red', marginTop: 22}}>
          <Left>
            <Icon name='arrow-back'/>
          </Left>
          <Body>
            <Title style={{ color: Colors.snow}}>{strings('EditarDogScreen.editDog')}</Title>
          </Body>
        </Header>
        <Content padder style={{backgroundColor: 'white', alignContent:"stretch"}}>
        <List>
          <ListItem style={{alignSelf:'center'}}>
            <Thumbnail large source={{uri: uri}}/>
          </ListItem>
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHName')} />
              </InputGroup>
          </ListItem> 
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHAge')} />
              </InputGroup>
          </ListItem>
          <ListItem>
              <InputGroup>
                  <Input placeholder={strings('CadastroDogScreen.placeHRace')}/>
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
      <Button style={{ alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
      <Text>{strings('EditarDogScreen.remove')}</Text>   
      </Button>
      <Button style={{ alignSelf: 'flex-end', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
      <Text>{strings('EditarDogScreen.save')}</Text>   
      </Button>
      </ListItem>
      </List>
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