import React, { Component } from 'react'

import { ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Form, Text, Item, Textarea, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet,
  Subtitle, Card, CardItem, List, Footer, FooterTab,
  Badge, Spinner, Thumbnail, ListItem, Label, Picker
} from 'native-base'
import FeedbackNota from '../Components/FeedbackNota';
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles


class FeedbackScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'key0',
      selected2: 'kay0',
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
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
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
              <Body><Title dark>Avalie o Passeio</Title></Body>
            </Header>
            <Content padder style={{backgroundColor: 'white'}}>
            <KeyboardAvoidingView behavior='position'>
              <Body>
              <FeedbackNota></FeedbackNota>
                <Item>
                <Text>Quantas vezes o cachorro fez xixi?</Text>
              <Picker
                iosHeader="Selecione um"
                mode="dropdown"
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)} >
                  <Item label="1" value="key0" />
                  <Item label="2" value="key1" />
                  <Item label="3" value="key2" />
                  <Item label="4" value="key3" />
                  <Item label="5+" value="key4" />
              </Picker>
                </Item>
                <Item>
                <Text>Quantas vezes o cachorro fez cocô?</Text>
              <Picker
                iosHeader="Selecione um"
                mode="dropdown"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)} >
                  <Item label="1" value="kay0" />
                  <Item label="2" value="kay1" />
                  <Item label="3" value="kay2" />
                  <Item label="4" value="kay3" />
                  <Item label="5+" value="kay4" />
              </Picker>
                </Item>
                <Item>
                  <Label customLabel>Observações</Label>
                </Item>
              </Body>
              <Form>
                <Textarea style={{backgroundColor:'lightgrey', borderColor:'black'}} rowSpan={5} bordered placeholder="Deixe seus comentários aqui" />
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
                  <Button onPress={() => navigate('HistoricoPasseadorScreen')}>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Histórico</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseadorPasseiosScreen')}>
                    <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>2</Text></Badge>
                    <Icon name='list-box' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Atribuido</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseiosLivresScreen')}>
                  <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>7</Text></Badge>
                    <Icon name='walk' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Livres</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen)
