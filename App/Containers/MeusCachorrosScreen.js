import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Root, Button,
  Card, CardItem, List, Footer, FooterTab,
  Spinner, Thumbnail
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Alert } from 'react-native'
import { Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';

var BUTTONS = [strings("MeusCachorrosScreen.editDog"), strings("MeusCachorrosScreen.deleteDog") , strings("MeusCachorrosScreen.back")];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

class MeusCachorrosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      dogs: [[], []],
      dogObj: [],
      remount: 1
    };
  }

  // required to load native-base font in expo
  async componentWillMount() {
    this.getDogs();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  
  getDogs() {
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/clientDogs';
    axios.post(url, { owner_id: firebase.auth().currentUser.uid })
      .then((response) => {
        resposta = response.data;
        //console.warn(resposta);
        for (i = 0; i < response.data.length; i++) {
          this.state.dogObj[i] = resposta[i];
          this.state.dogs[0][i] =
          strings("MeusCachorrosScreen.name") + response.data[i].name + strings("MeusCachorrosScreen.age") + response.data[i].age +
          strings("MeusCachorrosScreen.race") + response.data[i].race + strings("MeusCachorrosScreen.size") + response.data[i].port;
          this.state.dogs[1][i] = response.data[i].photoUrl;
        }
        this.forceUpdate();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  forceRemount() {
    this.setState({
      remount: this.state.remount + 1
    });
    this.componentWillMount();
    this.render();
  }

  render() {
    const { navigate } = this.props.navigation;
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
        <Root>
          <Container style={{ backgroundColor: 'red' }}>
            <Header style={{ backgroundColor: 'red', marginTop: 25}}>
              <Left>
                <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MenuClienteScreen')} />
              </Left>
              <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings("MeusCachorrosScreen.myDogs")}</Title></Body>
            </Header>
            <Content padder style={{ backgroundColor: 'white' }}>
              <ScrollView>
                <List dataArray={this.state.dogs[0]}
                  renderRow={(item) =>
                    <Card>
                      <CardItem style={{ justifyContent: 'space-between' }}>
                        <Left>
                          <Thumbnail source={{ uri: this.state.dogs[1][this.state.dogs[0].indexOf(item)] }}/>
                        </Left>
                        <Body>
                          <Text>{item}</Text>
                          <Button transparent dark
                            onPress={() => navigate('EditarDogScreen', {dogObj: this.state.dogObj[this.state.dogs[0].indexOf(item)]})}>
                            <Icon type='Ionicons' name='ios-paw'/>
                          </Button>
                        </Body>
                      </CardItem>
                    </Card>
                  }>
                </List>
                <Right>
                  <Button onPress={() => navigate('CadastroDogScreen')} trasparent style={{ backgroundColor: 'red', marginTop: 10 }}>
                    <Icon name='ios-add-circle' type='Ionicons' style={{ color: 'white', backgroundColor: 'red' }}></Icon>
                  </Button>
                  <Button onPress={() => this.forceRemount()} trasparent style={{ backgroundColor: 'red', marginTop: 10 }}>
                    <Icon name='refresh' type='Ionicons' style={{ color: 'white', backgroundColor: 'red' }}></Icon>
                  </Button>
                </Right>
              </ScrollView>
            </Content>
            <Footer style={{ backgroundColor: 'red' }}>
              <FooterTab style={{ backgroundColor: 'red' }}>
                <Button onPress={() => navigate('MenuClienteScreen')}>
                  <Icon name='md-person' type='Ionicons' style={{ color: 'white' }} />
                  <Text style={{ color: 'white' }}>{strings('Footer.menu_button')}</Text>
                </Button>
                <Button onPress={() => navigate('MeusCachorrosScreen')}>
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
        </Root>

      )
    }
  }
}
//justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'center'
//thumbnail source={{ uri: this.state.dogs[1][ this.state.dogs[0].indexOf(item) ] }}
const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MeusCachorrosScreen)

