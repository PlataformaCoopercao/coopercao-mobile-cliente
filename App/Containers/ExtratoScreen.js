import React, { Component } from 'react'
import { ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Root, Button, Card, CardItem, Footer,
  FooterTab, Spinner, Label
} from 'native-base'
import { Font} from "expo"
import { Colors } from '../Themes/'
import { Alert } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';

class HistoricoClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      uri: "https://randomuser.me/api/portraits/women/89.jpg",
      valorAvulso: 0,
      valorPlano: 0,
      valorTotal: 0,
      loaded: false,
      month: '0',
      year: '0'
    };
  }

  getMes(mes){
    switch(mes){
      case 0: nomeDoMes = strings('ExtratoScreen.january')
      case 1: nomeDoMes = strings('ExtratoScreen.february')
      case 2: nomeDoMes = strings('ExtratoScreen.march')
      case 3: nomeDoMes = strings('ExtratoScreen.april')
      case 4: nomeDoMes = strings('ExtratoScreen.may')
      case 5: nomeDoMes = strings('ExtratoScreen.june')
      case 6: nomeDoMes = strings('ExtratoScreen.july')
      case 7: nomeDoMes = strings('ExtratoScreen.august')
      case 8: nomeDoMes = strings('ExtratoScreen.september')
      case 9: nomeDoMes = strings('ExtratoScreen.october')
      case 10: nomeDoMes = strings('ExtratoScreen.november')
      case 11: nomeDoMes = strings('ExtratoScreen.december')
    }

  }

  getExtrato(){
    this.setState({loaded:false});
    var data = new Date();
    this.state.month = "0" + parseInt(data.getMonth() + 1);
    this.state.year = data.getFullYear();
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/clientBill', {owner_id: firebase.auth().currentUser.uid,
     month: this.state.month,
     year: this.state.year})
    .then(response => this.setState({
        valorAvulso: parseInt(response.data.pagamentosAvulsos),
        valorPlano: parseInt(response.data.pagamentosPlano),
        valorTotal: parseInt(response.data.pagamentosAvulsos) + parseInt(response.data.pagamentosPlano),
        loaded:true
      })).catch((error) => {Alert.alert(error.message)});
    this.forceUpdate();
  }

  // required to load native-base font in expo
  async componentDidMount() {
    await this.getExtrato();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }
  
  render() {
    const {navigate} = this.props.navigation;
    if (!this.state.loaded) {
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
      <Root>
          <Container style={{backgroundColor:'red'}}>
          <Header style={{ backgroundColor: 'red', marginTop: 25}}>
          <Left><Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MenuClienteScreen')}/></Left>
            <Body>
              <Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('ExtratoScreen.extract')}</Title>
            </Body>
            <Right>
            </Right>
          </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <Card> 
                  <CardItem>
                  <Left><Label>{strings('ExtratoScreen.extractOf')}</Label></Left>
                    <Right><Label>{strings('ExtratoScreen.expenses')}</Label></Right>
                  </CardItem>
                  <CardItem>
                    <Left><Label>{strings('ExtratoScreen.plannedWalks')}</Label></Left>
                    <Right><Label style={{color: 'red'}}>{this.state.valorPlano} $</Label></Right>
                  </CardItem>
                  <CardItem>
                    <Left><Label>{strings('ExtratoScreen.onewayWalk')}</Label></Left>
                    <Right><Label style={{color: 'red'}}>{this.state.valorAvulso} $</Label></Right>
                  </CardItem>
                  <CardItem>
                    <Left><Label>{strings('ExtratoScreen.total')}</Label></Left>
                    <Right><Label style={{color: 'red'}}>{this.state.valorTotal} $</Label></Right>
                  </CardItem>
                </Card>
              </ScrollView>
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
        </Root>

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

export default connect(mapStateToProps, mapDispatchToProps)(HistoricoClienteScreen)

