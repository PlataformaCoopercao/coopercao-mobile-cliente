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
import { strings } from '../locales/i18n';
const uri = "https://static1.squarespace.com/static/573b62e9746fb941c1458dcd/t/58bf1f27d1758e5d0c580379/1488921550603/who-we-are.jpg";
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

const names = [
  'Nome: Terry  Idade: 2anos\nRaça: Husky  Porte: Grande',
  'Nome: Andy  Idade: 2anos\nRaça: Husky  Porte: Grande',
  'Nome: Joe  Idade: 2anos\nRaça: Husky  Porte: Grande',
]
class HistoricoClienteScreen extends Component {
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
      // <ScrollView style={styles.scrollViewContainer}>
      //   <Header></Header>
      // <View>
      //   {
      //     this.state.names.map((item, index) => (
      //       <TouchableOpacity
      //         key={item.id}
      //         style={styles.listContainer}
      //         onPress={() => this.alertItemName(item)}>
      //         <Text style={styles.text}>
      //           {item.name}
      //           {item.datetime}
      //           {item.dono}
      //           {item.duration}
      //           {item.valor}
      //         </Text>
      //       </TouchableOpacity>
      //     ))
      //   }
      // </View>
      // <Text></Text>
      // <Footer></Footer>
      // </ScrollView>
      <Root>
          <Container style={{backgroundColor:'red'}}>
          <Header style={{ backgroundColor: 'red'}}>
            <Left>
              <Icon name='arrow-back' />
            </Left>
            <Body>
              <Title style={{color: Colors.snow}}>{"Meus Cachorros"}</Title>
            </Body>
            <Right>
            </Right>
          </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <List dataArray={names}
                  renderRow={(item) =>
                    <Card>
                      <CardItem style={{justifyContent: 'space-between'}}>
                      <Left>
                        <Thumbnail source={{uri: uri}}/>
                      </Left>
                      <Text>{item}</Text>
                      </CardItem>
                    </Card>
                  }>
                </List>
                <Right>
                <Button onPress={() => navigate('CadastroDogScreen')} trasparent style={{backgroundColor:'red', marginTop:10}}>
                  <Icon name= 'ios-add-circle' type='Ionicons' style={{color:'white', backgroundColor:'red'}}></Icon>
                </Button>
                </Right>
              </ScrollView>
            </Content>
            <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button onPress={() => navigate('MenuClienteScreen')}>
                    <Icon name='md-person' type='Ionicons' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.profile_button')}</Text>
                  </Button>
                  <Button onPress={() => navigate('HistoricoClienteScreen')}>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.history_button')}</Text>
                  </Button>
                  <Button onPress={() => navigate('ExtratoScreen')}>
                    <Icon name='ios-paper' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.extract_button')}</Text>
                  </Button>
                  <Button>
                    <Icon name='walk' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.walks_button')}</Text>
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

