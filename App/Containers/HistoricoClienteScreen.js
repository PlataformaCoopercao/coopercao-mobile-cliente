import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet,
  Subtitle, Card, CardItem, List, Footer, FooterTab,
  Badge, Spinner, Thumbnail, ListItem, Label, Item, Input
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Alert } from 'react-native'
import axios from 'axios';
import * as firebase from 'firebase';
import { strings } from '../locales/i18n';
const feed = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget ligula eu lectus lobortis condimentum. Aliquam nonummy auctor massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla at risus. Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.'

// const Header = (props) => (
//   <View style={styles.container}>
//     <TextInput
//       style={styles.input}
//       placeholder="Procurar..."
//       onChangeText={(text) => console.log('searching for ', text)}
//     />
//   </View>
// );

// const Footer = (props) => (
//   <View style={styles.container}>
//    <TouchableOpacity style ={styles.btnEntrar} >
//             <Text style={styles.textEntrar}>Voltar</Text>
//     </TouchableOpacity>
//   </View>
// );

class HistoricoClienteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: 9,
      isVisible: false,
      dataArrayPasseios: [[], []],
      remount: 1
    };
  }

  getHistoricoPasseios(){
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/getHistoricoCliente', {ownerKey: firebase.auth().currentUser.uid})
    .then((response) => {
      if(response.data != null){
        for(var x = 0; x < response.data.length; x++){
            this.state.dataArrayPasseios[0][x] =
            'Passeador: '+ response.data[x].walker.name + 
            '\nData: '+ response.data[x].date + '\nHorário: '+ response.data[x].time +
            '\nDuração: '+ response.data[x].walk_duration + '\nValor: '+ response.data[x].value +
            '\nCão: '+ response.data[x].dog.name + '\nRua: '+ response.data[x].address.street;
            this.state.dataArrayPasseios[1][x] = response.data[x].walker.photoUrl;
            console.log(response.data[x].walker.name, response.data[x].date, response.data[x].time, response.data[x].value, response.data[x].dog.name, response.data[x].address.street);
          
        }
        this.forceUpdate();
      }else{
        console.log("Não tem passeios");
      }
    }
    ).catch((error) => {
      Alert.alert(error.message);
    });
  }

   
  forceRemount() {
    this.setState({
      remount: this.state.remount + 1
    });
    this.componentWillMount();
    this.render();
  }
  // required to load native-base font in expo
  async componentWillMount() {
    this.getHistoricoPasseios();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }
  
  // alertItemName = (item) => {
  //   Alert.alert(
  //     'Feedback do Passeio',
  //     item.feedback,
  //     [
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ],
  //     { cancelable: false }
  //   )
    
  // }

  
  render() {
    const { navigate } = this.props.navigation;
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
          <Container style={{ backgroundColor: 'red' }}>
            <Header style={{ backgroundColor: 'red', marginTop: 25}}>
              <Left>
                <Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MenuClienteScreen')} />
              </Left>
              <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>Histórico de passeios</Title></Body>
            </Header>
            <Content padder style={{ backgroundColor: 'white' }}>
              <ScrollView>
                <List dataArray={this.state.dataArrayPasseios[0]}
                  renderRow={(item) =>
                    <Card>
                      <CardItem style={{}} >
                        <Left>
                        <Thumbnail source={{ uri:this.state.dataArrayPasseios[1][this.state.dataArrayPasseios[0].indexOf(item)]}} />
                        </Left>
                        <Body>
                          <Text style={{}}>{item}</Text>
                        </Body>
                        <Right>
                          <Button onPress={() => navigate('AvaliacaoScreen', {passeio: this.state.dataArrayPasseios[0][this.state.dataArrayPasseios[0].indexOf(item)]})} trasparent style={{ backgroundColor: 'white', marginTop: 10 }}>
                          <Icon name='ios-medal' type='Ionicons' style={{color:'black'}}/>
                        </Button>
                        </Right>
                      </CardItem>
                    </Card>
                  }>
                </List>
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

