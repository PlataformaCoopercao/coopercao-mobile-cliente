import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View, TouchableOpacity} from 'react-native'
import {Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
   CardItem, Footer, FooterTab, Badge, Spinner, Label, ListItem, Thumbnail
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { connect } from 'react-redux'
import { Colors } from '../Themes/'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PasseioScreenStyle'

var passeador = "João Bezerros"
var cao = "Managarmr"
var data = "10/12/2018"
var hora = "10:00"
var endereco = "Rua dos Bobos, nº 0"
var fotoPasseador = 'https://randomuser.me/api/portraits/men/66.jpg';
var fotoCao = 'https://images.dog.ceo/breeds/rottweiler/n02106550_1033.jpg';
class PasseioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      horaInicio: '',
      horaFinal: '',
      btnIniciar: true,
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: ''
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

  GetTime() {
    var date, TimeType, hour, minutes, seconds, fullTime;
    date = new Date();
    hour = date.getHours();
    if (hour <= 11) {
      TimeType = 'AM';
    }
    else {
      TimeType = 'PM';
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

    this.setState({
      time: fullTime
    });
  }

  componentDidMount() {
    this.Clock = setInterval( () => this.GetTime(), 1000 );
  }

  componentWillUnmount(){
    clearInterval(this.Clock);
  }

  showTimeInicio = () => {
    this.setState({
      btnColor: '#C1C1C1',
      horaInicio: this.state.time.toString(),
      btnIniciar: !this.state.btnIniciar
    })
  }
  showTimeFim = () => {
    this.setState({
      horaFinal: this.state.time.toString()
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    
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
      // <ScrollView style={styles.container}>
      //   <KeyboardAvoidingView behavior='position'>
      //     <View style={styles.horizontal}>
      //       <Text style={styles.leftText}>Passeador: {passeador}</Text>
      //       <Text style={styles.rightText}>Cão: {cao}</Text>
      //     </View>
      //     <View style={styles.horizontal}>
      //       <Text style={styles.leftText}>Data: {data}</Text>
      //       <Text style={styles.rightText}>Horário: {hora}</Text>
      //     </View>
      //     <View style={styles.padding}>
      //       <Text style={styles.leftText}>Endereço: {endereco}</Text>
      //     </View>
      //     <View style={styles.padding}>
      //       <Text style={styles.leftText}>Início do passeio: {this.state.horaInicio}</Text>
      //     </View>
      //     <View style={styles.padding}>
      //       <Text style={styles.leftText}>Fim do passeio: {this.state.horaFinal}</Text>
      //     </View>
      //     <View style={styles.horizontal}>
      //     <TouchableOpacity style ={{
      //       width: 100,
      //        height: 45,
      //        justifyContent: 'center',
      //         marginTop: 20,
      //         borderRadius: 5,
      //         position: 'relative',
      //         backgroundColor: this.state.btnColor
      //          }} onPress={this.showTimeInicio} disabled={!this.state.btnIniciar}>
      //       <Text style={styles.textEntrar}>Iniciar</Text>
      //     </TouchableOpacity>
      //     <TouchableOpacity style ={styles.btnEntrar} onPress={this.showTimeFim}>
      //       <Text style={styles.textEntrar}>Encerrar</Text>
      //     </TouchableOpacity>
      //     </View>
      //     <View style={{alignItems: 'center'}}>
      //     <TouchableOpacity style ={styles.btnFeedback}>
      //       <Text style={styles.textEntrar}>Prosseguir para o feedback</Text>
      //     </TouchableOpacity>
      //     </View>
      //   </KeyboardAvoidingView>
      // </ScrollView>
          <Root>
          <Container style={{backgroundColor:'black'}}>
          <Header style={{backgroundColor:'red', marginTop: 22}}>
              <Left><Icon name='arrow-back' /></Left>
              <Body><Title dark>Passeio</Title></Body>
            </Header>
            <Content padder style={{backgroundColor: 'white'}}>
            <ScrollView>
                <Card>
                  <CardItem>
                    <Thumbnail large source={{uri: fotoPasseador}} borderRadius='20'/>
                    <Right><Text style={{justifyContent:'center'}}> {passeador}</Text></Right>
                  </CardItem>
                  <CardItem>
                    <Thumbnail large source={{uri: fotoCao}} borderRadius='20'/>
                    <Right><Text style={{justifyContent:'center'}}>{cao}</Text></Right>
                  </CardItem>
                  <CardItem>
                    <Label> Data: </Label>
                    <Text style={{justifyContent:'center'}}>{data}</Text>
                    <Right><Label> Hora: </Label></Right>
                    <Text style={{justifyContent:'center'}}>{hora}</Text>
                  </CardItem>
                  <CardItem>
                    <Label> Endereço: </Label>
                    <Text style={{justifyContent:'center'}}>{endereco}</Text>
                  </CardItem>
                  <CardItem>
                  <Label> Inicio: </Label>
                    <Text style={{justifyContent:'center'}}>{this.state.horaInicio}</Text>
                    <Right><Label> Fim: </Label></Right>
                    <Text style={{justifyContent:'center'}}>{this.state.horaFinal}</Text>
                  </CardItem>
                </Card>
                <Button style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, backgroundColor:'red' }} onPress={this.showTimeInicio} disabled={!this.state.btnIniciar}> 
                  <Text>Iniciar</Text>
                </Button>
                <Button style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, backgroundColor:'red' }} onPress={this.showTimeFim}>
                  <Text>Finalizar</Text>
                </Button>
                <Button style={{ alignSelf: 'center', marginTop: 10, marginBottom: 10, backgroundColor:'gray' }} onPress={() => navigate('FeedbackScreen')}>
                  <Text>Realizar Feedback</Text>
                </Button>
              </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasseioScreen)