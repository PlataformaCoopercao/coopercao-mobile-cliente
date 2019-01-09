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
import { strings } from '../locales/i18n';
// Styles
import { Images, Colors } from '../Themes';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './Styles/EditarClienteScreenStyle'

class EditarClienteScreen extends Component {
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
    const uri = "https://pbs.twimg.com/media/DahEyvzVQAAizMF.jpg";
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
        <Container>
          <Header style={{ backgroundColor: 'red'}}>
            <Left>
              <Icon name='arrow-back' />
            </Left>
            <Body>
              <Title style={{color: Colors.snow}}>{strings('EditarClienteScreen.edit')}</Title>
            </Body>
            <Right>
            </Right>
          </Header>

          <Content style={{alignContent:"stretch"}}>
          <Thumbnail style={{alignSelf:"center"}} large source={{uri: uri}}/>
          <List>
            <ListItem>
              <Text>{strings('EditarClienteScreen.name')}</Text>
              <InputGroup>
                <Input>Alex Cimo</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.email')}</Text>
              <InputGroup>
                <Input>cimo.ygo@gmail.com</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.password')}</Text>
              <InputGroup>
                <Input secureTextEntry={true}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.passwordTwo')}</Text>
              <InputGroup>
                <Input secureTextEntry={true}/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.CEP')}</Text>
              <InputGroup>
                <Input/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.street')}</Text>
              <InputGroup>
                <Input>Rua dos Bobos</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.number')}</Text>
              <InputGroup>
                <Input>0</Input>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.neighborhood')}</Text>
              <InputGroup>
                <Input/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.complement')}</Text>
              <InputGroup>
                <Input/>
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>{strings('EditarClienteScreen.phone')}</Text>
              <InputGroup>
                <Input>91234-5678</Input>
              </InputGroup>
            </ListItem>
          </List>
          
          <ListItem>
            <Button onPress={() => navigate('PerfilClienteScreen')} style={{ alignSelf: 'flex-start', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
              <Text>{strings('EditarClienteScreen.cancel')}</Text>
            </Button>
            <Button style={{ alignSelf: 'flex-end', marginTop: 20, marginHorizontal: 40, backgroundColor:'red' }}>
              <Text>{strings('EditarClienteScreen.save')}</Text>
            </Button>
          </ListItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditarClienteScreen)
