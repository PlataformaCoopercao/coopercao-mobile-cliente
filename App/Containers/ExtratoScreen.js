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
const uri = "https://randomuser.me/api/portraits/women/89.jpg";
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

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
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
          <Container style={{backgroundColor:'black'}}>
          <Header style={{ backgroundColor: 'red'}}>
            <Left>
              <Icon name='arrow-back' />
            </Left>
            <Body>
              <Title style={{color: Colors.snow}}>{strings('ExtratoScreen.extract')}</Title>
            </Body>
            <Right>

            </Right>
          </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <List dataArray={meses}
                  renderRow={(item) =>
                    <Card> 
                      <CardItem>
                      <Left><Text>{strings('ExtratoScreen.extractOf')} {item}</Text></Left>
                        <Right><Label>{strings('ExtratoScreen.expenses')}</Label></Right>
                      </CardItem>
                      <CardItem>
                        <Left><Label>{strings('ExtratoScreen.plannedWalks')}</Label></Left>
                        <Right><Label style={{color: 'red'}}>365,00 $</Label></Right>
                      </CardItem>
                      <CardItem>
                        <Left><Label>{strings('ExtratoScreen.onewayWalk')}</Label></Left>
                        <Right><Label style={{color: 'red'}}>150,00 $</Label></Right>
                      </CardItem>
                      <CardItem>
                        <Left><Label>{strings('ExtratoScreen.penalties')}</Label></Left>
                        <Right><Label style={{color: 'red'}}>35,00 $</Label></Right>
                      </CardItem>
                      <CardItem>
                        <Left><Label>{strings('ExtratoScreen.total')}</Label></Left>
                        <Right><Label style={{color: 'red'}}>550,00 $</Label></Right>
                      </CardItem>
                    </Card>
                  }>
                </List>
              </ScrollView>
            </Content>
            <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button>
                    <Icon name='md-person' type='Ionicons' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Perfil</Text>
                  </Button>
                  <Button>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>Histórico</Text>
                  </Button>
                  <Button>
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

