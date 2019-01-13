import React, { Component } from 'react'
import { ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Root, Button, Card, CardItem, List, Footer,
  FooterTab, Spinner, Label
} from 'native-base'
import { Font} from "expo"
import { Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';

var data = new Date();

class HistoricoClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      uri: "https://randomuser.me/api/portraits/women/89.jpg",
      valorAvulso: '',
      valorPlano: '',
      valorTotal: '',
      mesAtual: data.getMonth(),
      anoAtual: data.getFullYear()
    };
  }

  getMes(mes){
    switch(mes){
      case 0: nomeDoMes = 'January'
      case 1: nomeDoMes = 'February'
      case 2: nomeDoMes = 'March'
      case 3: nomeDoMes = 'April'
      case 4: nomeDoMes = 'May'
      case 5: nomeDoMes = 'June'
      case 6: nomeDoMes = 'July'
      case 7: nomeDoMes = 'August'
      case 8: nomeDoMes = 'September'
      case 9: nomeDoMes = 'October'
      case 10: nomeDoMes = 'November'
      case 11: nomeDoMes = 'December'
    }

  }

  getExtrato(){
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getFaturaMensalCliente', {ownerKey: firebase.auth().currentUser.uid, mes: this.state.mesAtual+1, ano: this.state.anoAtual})
    .then(response => this.setState({valorAvulso: response.data.pagamentosAvulsos, valorPlano: response.data.pagamentosPlano, valorTotal: response.data.pagamentosAvulsos + response.data.pagamentosPlano})).catch((error) => {Alert.alert(error.message)});
    this.forceUpdate()
  }

  // required to load native-base font in expo
  async componentDidMount() {
    this.getExtrato();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }
  
  render() {
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

