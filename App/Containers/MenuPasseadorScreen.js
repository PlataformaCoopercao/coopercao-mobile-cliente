import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
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
import styles from './Styles/MenuPasseadorScreenStyle.js';
import { Dropdown } from 'react-native-material-dropdown';

class MenuPasseadorScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
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

  render() {
    const uri = "http://www.revistapronews.com.br/repository/news/big-153625870692-edenwololo1.jpg";
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
        <Container style={{ backgroundColor: 'black' }}>
          <Header style={{ backgroundColor: 'red', marginTop: 15 }}>
            <Left>
              <Icon name='arrow-back' />
            </Left>
            <Body>
              <Title>{"Menu"}</Title>
            </Body>
            <Right>

            </Right>
          </Header>
          <Content padder style={{ backgroundColor: 'white', alignContent: "stretch" }}>
            <List>
              <ListItem style={{ alignSelf: 'center', alignContent: 'center', flexDirection: 'column' }}>
                <Thumbnail style={{ height: 120, width: 120 }} large source={{ uri: uri }} />
                <Text>Bem-Vindo Eden Wiedemann</Text>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao}>
                  <Text>{"Passeios Agendados"}</Text>
                </Button>          </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao}>
                  <Text>{"Passeios Disponíveis"}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao}>
                  <Text>{'Histórico de passeios'}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao}>
                  <Text>{'Perfil'}</Text>
                </Button>
              </ListItem>
              <ListItem style={{ alignSelf: 'center' }}>
                <Button style={styles.botao}>
                  <Text>{'Fatura'}</Text>
                </Button>
              </ListItem>
            </List>
            <Button style={styles.botao}>
              <Text>{"Deslogar"}</Text>
            </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuPasseadorScreen)
