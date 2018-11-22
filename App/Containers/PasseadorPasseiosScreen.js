import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card, CardItem, List, Footer, FooterTab, Badge, Spinner
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import styles from './Styles/PasseadorPasseiosScreenStyle'

var BUTTONS = ["Iniciar Passeio", "Requisitar Substituição", "Cancelar Passeio", "Cancelar"];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;
const dataArrayPasseios = [
  'Data: 12/12/2018    Horário: 10:00\nCão: Barghest\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Garmr\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Will\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: CuSith\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Fenrir\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Inugami\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Anubis\nRua dos Bobos, nº 0'
];
var tam = dataArrayPasseios.length
class PasseadorPasseiosScreen extends Component {
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
        <Container style={{backgroundColor:'red'}}>
          <Header style={{backgroundColor:'red', marginTop: 22}}/>
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
              <Body><Title style={{left: -90, color: Colors.snow}}>{strings('PasseadorPasseiosScreen.assignedWalks')}</Title></Body>
              
            </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <List dataArray={dataArrayPasseios}
                  renderRow={(item) =>
                    <Card>
                      <CardItem style={{justifyContent: 'space-between'}}>
                      <Text>{item}</Text>
                      {<Button transparent dark
                        onPress={() =>
                          ActionSheet.show(
                            {
                              options: BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              title: "Passeio"
                            },
                            buttonIndex => {
                              this.setState({ clicked: BUTTONS[buttonIndex] });
                            }
                          )}
                      >
                        <Icon type='Ionicons' name='ios-paw' />
                      </Button>}
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

export default connect(mapStateToProps, mapDispatchToProps)(PasseadorPasseiosScreen)
