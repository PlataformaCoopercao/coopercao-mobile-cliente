import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet,
  Subtitle, Card, CardItem, List, Footer, FooterTab,
  Badge, Spinner, Thumbnail, ListItem, Label
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles

const dataArrayPasseios = [
  'Data: 12/09/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Barghest\nRua dos Zubobos, nº 0',
  'Data: 12/11/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Garmr\nRua dos Bobos, nº 0',
  'Data: 12/10/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Will\nRua dos Bobos, nº 0',
  'Data: 12/02/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: CuSith\nRua dos Bobos, nº 0',
  'Data: 12/01/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Fenrir\nRua dos Bobos, nº 0',
  'Data: 12/06/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Inugami\nRua dos Bobos, nº 0',
  'Data: 12/04/2018    Horário: 10:00\nDuração: 1:00:00     Valor: R$: 15,00\nCão: Anubis\nRua dos Bobos, nº 0'
];
const uri = "https://images.dog.ceo/breeds/sheepdog-shetland/n02105855_14126.jpg";
var tam = dataArrayPasseios.length
class TelaHistoricoPasseadorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: ''
    };
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
          <Header style={{backgroundColor:'red', marginTop: 22}}>
              <Left><Icon name='arrow-back' /></Left>
              <Body><Title style={{color: Colors.snow}}>{strings('HistoricoPasseadorScreen.walkHistory')}</Title></Body>
              <Right/>
            </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <Card>
                  <CardItem>
                    <Left><Icon type='Ionicons' name='ios-card' /></Left>
                    <Body><Label>855,00</Label></Body>
                    <Right><Label>NOV</Label></Right>
                  </CardItem>
                </Card>
                <List dataArray={dataArrayPasseios}
                  renderRow={(item) =>
                    <Card> 
                      <CardItem style={{justifyContent: 'space-between'}}>
                      <Left>
                        <Thumbnail small source={{uri: uri}}/>
                      </Left>
                      <Text>{item}</Text>
                      </CardItem>
                    </Card>
                  }>
                </List>
              </ScrollView>
            </Content>
            <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button>
                    <Icon name='person' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.profile_button')}</Text>
                  </Button>
                  <Button onPress={() => navigate('HistoricoPasseadorScreen')}>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.history_button')}</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseadorPasseiosScreen')}>
                    <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>2</Text></Badge>
                    <Icon name='list-box' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.assign_button')}</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseiosLivresScreen')}>
                  <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>7</Text></Badge>
                    <Icon name='walk' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.available_button')}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelaHistoricoPasseadorScreen)
