import React, { Component } from 'react'
import { strings } from '../locales/i18n';
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
import { Images, Colors } from '../Themes';
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

class AvaliacaoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      passeio: this.props.navigation.state.params.passeio,
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
    };
  }
  
  addAvaliacao(){
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/updateDog';
    axios.post(url, { owner: firebase.auth().currentUser.uid })
      .then((response) => {
        resposta = response.data;

      })
  }

  async componentWillMount() {
    console.log(this.state.passeio);
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
          <Header style={{backgroundColor:'red', marginTop: 22}} />
        <Content>
          <Spinner color='red' />
        </Content>
      </Container>
      );
    } else {
      return (
        <Root>
          <Container style={{backgroundColor:'black'}}>
          <Header style={{ backgroundColor: 'red', marginTop: 25}}>
          <Left><Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('HistoricoClienteScreen')} /></Left>
                <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>Avalie o Passeador</Title></Body>
          </Header>
            <Content padder style={{backgroundColor: 'white'}}>
            <KeyboardAvoidingView behavior='position'>
              <Body>
              <FeedbackNota></FeedbackNota>
                <Item>
                  <Label customLabel>{strings('General.comments')}</Label>
                </Item>
              </Body>
              <Form>
                <Textarea style={{backgroundColor:'lightgrey'}}rowSpan={5} bordered placeholder={strings('AvaliacaoScreen.placeHComments')} />
              </Form>
              <Body>
              <Button style={{backgroundColor: 'red',  width: 150, height: 60, marginTop: 20, borderRadius: 5, position: 'relative', justifyContent: 'center'}}>
                 <Text style={{color:'white', fontSize: 16}}>{strings('General.rate_button')}</Text>
              </Button>
              </Body>
              </KeyboardAvoidingView>
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
