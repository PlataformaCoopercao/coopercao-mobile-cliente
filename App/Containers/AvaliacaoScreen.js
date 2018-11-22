import React, { Component } from 'react'

import { ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Form, Text, Item, Textarea, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet,
  Subtitle, Card, CardItem, List, Footer, FooterTab,
  Badge, Spinner, Thumbnail, ListItem, Label
} from 'native-base'
import FeedbackNota from '../Components/FeedbackNota';
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

class AvaliacaoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container style={{backgroundColor:'black'}}>
          <Header style={{backgroundColor:'red', marginTop: 22}}/>
        <Content>
          <Spinner color='red' />
        </Content>
      </Container>
      );
    } else {
      return (
        <Root>
          <Container style={{backgroundColor:'black'}}>
          <Header style={{backgroundColor:'red', marginTop: 22}}>
              <Left><Icon name='arrow-back' /></Left>
              <Body><Title dark>Avalie seu Passeador</Title></Body>
            </Header>
            <Content padder style={{backgroundColor: 'white'}}>
            <KeyboardAvoidingView behavior='position'>
              <Body>
              <FeedbackNota></FeedbackNota>
                <Item>
                  <Label customLabel>Observações</Label>
                </Item>
              </Body>
              <Form>
                <Textarea style={{backgroundColor:'lightgrey'}}rowSpan={5} bordered placeholder="Deixe seus comentários aqui" />
              </Form>
              <Body>
              <Button style={{backgroundColor: 'red',  width: 150, height: 60, marginTop: 20, borderRadius: 5, position: 'relative', justifyContent: 'center'}}>
                 <Text style={{color:'white', fontSize: 16}}>Avaliar</Text>
              </Button>
              </Body>
              </KeyboardAvoidingView>
          </Content>
          <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button>
                    <Icon name='person' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Perfil</Text>
                  </Button>
                  <Button onPress={() => navigate('HistoricoClienteScreen')}>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Histórico</Text>
                  </Button>
                  <Button onPress={() => navigate('ExtratoScreen')}>
                    <Icon name='ios-paper' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Extrato</Text>
                  </Button>
                  <Button>
                    <Icon name='walk' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Passeios</Text>
                  </Button>
                </FooterTab>
              </Footer>
          </Container>
        </Root>
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

export default connect(mapStateToProps, mapDispatchToProps)(AvaliacaoScreen)
