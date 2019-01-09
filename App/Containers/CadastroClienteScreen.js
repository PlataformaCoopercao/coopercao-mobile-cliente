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

// Styles
import { Images, Colors } from '../Themes';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';

class CadastroClienteScreen extends Component {
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
    const uri = "https://cdn0.iconfinder.com/data/icons/user-interface-vol-3-12/66/68-512.png";
    if (this.state.fontLoading) {
      return(
        <Container>
          <Header />
            <Content>
              <Spinner color='red' />
            </Content>
        </Container>
      );
    } else {
      return(
        <Container>
          <Header style={{ backgroundColor: 'red'}}>
            <Left>
              <Icon name='arrow-back' />
            </Left>
            <Body>
              <Title style={{color: Colors.snow}}>Cadastro</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content style={{alignContent:"stretch"}}>
          <Thumbnail style={{alignSelf:"center"}} large source={{uri: uri}}/>
          <List>
            <ListItem>
              <InputGroup>
                <Input placeholder="Nome"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Email"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input secureTextEntry={true} placeholder="Senha"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input secureTextEntry={true} placeholder="Confirmação de senha"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="CEP"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Rua"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Nº"/>
                <Input placeholder="Bairro"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Complemento"/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input placeholder="Telefone para contato"/>
              </InputGroup>
            </ListItem>
          </List>
          

          <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }}>
          <Text>Cadastrar</Text>
          </Button>
          <Button onPress={() => navigate('LoginScreen')} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor:'red' }}>
          <Text>Cancelar</Text>
          </Button>
          </Content>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(CadastroClienteScreen)