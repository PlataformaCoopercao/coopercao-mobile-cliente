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

const names = [
  'Passeador: Biliana\nData: 12/09/2018\nHorário: 08:00 Duração: 1:00:00\nValor: R$: 15,00\nCão: Barghest\nRua dos Zubobos, nº 0',
  'Passeador: Biliana\nData: 12/11/2018\nHorário: 07:30 Duração: 1:00:00\nValor: R$: 15,00\nCão: Garmr\nRua dos Bobos, nº 0',
  'Passeador: Biliana\nData: 12/10/2018\nHorário: 11:00 Duração: 1:00:00\nValor: R$: 15,00\nCão: Will\nRua dos Bobos, nº 0',
  'Passeador: Biliana\nData: 12/02/2018\nHorário: 10:00 Duração: 1:00:00\nValor: R$: 15,00\nCão: CuSith\nRua dos Bobos, nº 0',
  'Passeador: Biliana\nData: 12/01/2018\nHorário: 15:20 Duração: 1:00:00\nValor: R$: 15,00\nCão: Fenrir\nRua dos Bobos, nº 0',
  'Passeador: Biliana\nData: 12/06/2018\nHorário: 10:15 Duração: 1:00:00\nValor: R$: 15,00\nCão: Inugami\nRua dos Bobos, nº 0',
  'Passeador: Biliana\nData: 12/04/2018\nHorário: 17:45 Duração: 1:00:00\nValor: R$: 15,00\nCão: Anubis\nRua dos Bobos, nº 0'
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
          <Header style={{backgroundColor:'red', marginTop: 22}} searchBar rounded>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search"/>
            </Item>
            <Right>
            <Button transparent>
              <Text>Search</Text>
            </Button>
            </Right>
          </Header>
            <Content padder style={{backgroundColor: 'white'}}>
              <ScrollView>
                <Card>
                  <CardItem>
                    <Left><Icon type='Ionicons' name='ios-card' /></Left>
                    <Body><Label>855,00</Label></Body>
                    <Right><Label>NOV</Label></Right>
                  </CardItem>
                </Card>
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
              </ScrollView>
            </Content>
            <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button>
                    <Icon name='person' style={{color:'white'}}/>
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

