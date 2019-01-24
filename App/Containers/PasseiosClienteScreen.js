import React, { Component } from 'react'
import { ScrollView, Alert, View, FlatList} from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Form, Textarea, Root, Button, ActionSheet, Card,
  CardItem, List, Footer, FooterTab, Spinner, ListItem
} from 'native-base'
import { Font } from "expo"
import { Colors } from '../Themes/'
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PasseiosClienteScreenStyle'

var BUTTONS = [strings('PasseiosClienteScreen.rescheduleWalk'), strings('PasseiosClienteScreen.cancelWalk'), strings('PasseiosClienteScreen.back')];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;
var passeiosAlocados = [];
var passeiosAbertos = [];

class PasseiosClienteScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: 9,
      edited: '',
      chosenDate: '',
      isVisible: false,
      dataArrayPasseios: []
    };
  }

  getPasseiosAgendados(){
    axios.post('https://us-central1-coopercao-backend.cloudfunctions.net/clientScheduledWalks', {owner_id: firebase.auth().currentUser.uid})
    .then((response) => {
      if(response.data != null){

        for(x = 0; x < response.data.length; x++){
          for(y = 0; y < response.data[x].length; y++){
            this.state.dataArrayPasseios[y] =
            strings("PasseiosClienteScreen.dog")+ response.data[x][y].dog.name + 
            strings("PasseiosClienteScreen.date")+ response.data[x][y].date + strings("PasseiosClienteScreen.time")+ response.data[x][y].time
            
          }
        }
        this.forceUpdate()
      }else{
      }
    }
    ).catch((error) => {Alert.alert(error.message)});
  }

  handlePicker = (datetime) => {
    this.setState(
      {
        isVisible: false,
        chosenDate: moment(datetime).format('DD/MM/YY - HH:mm')
      }
    )
  }

  showPicker = () => {
    this.setState(
      { isVisible: true }
    )
  }

  hidePicker = () => {
    this.setState(
      {
        isVisible: false
      }
    )
  }

  // required to load native-base font in expo
  async componentDidMount() {
    this.getPasseiosAgendados();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  renderRow ({ item }) {
    return (
      <ListItem
        avatar={<Avatar
                  rounded
                  source={item.dog.photoUrl && {uri: item.dog.photoUrl}}
                  title={item.key}
                />}
        title={item.dog.name}
      />
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container>
          <Header style={{ backgroundColor: 'red', marginTop: 22 }} />
          <Content>
            <Spinner color='red' />
          </Content>
        </Container>
      );
    }
    else {
      if (this.state.clicked == strings('PasseiosClienteScreen.rescheduleWalk')) { // ------------TELA REMARCAR PASSEIO
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
            <Header style={{ backgroundColor: 'red', marginTop: 25}}>
                <Left><Icon style={{ marginHorizontal: 10}} name='arrow-back' onPress={() => this.setState({ clicked: "9" })} /></Left>
                <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('PasseiosClienteScreen.rescheduleWalk')}</Title></Body>

              </Header>
              <Content padder style={{ backgroundColor: 'white' }}>
                <ScrollView>
                  <View>
                    <DateTimePicker
                      isVisible={this.state.isVisible}
                      onConfirm={this.handlePicker}
                      onCancel={this.hidePicker}
                      mode={'datetime'}
                      datePickerModeAndroid={'spinner'}
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>{strings('PasseiosClienteScreen.chooseDateTime')}</Text>
                    <View style={styles.flexContainer}>
                      <Text onPress={this.showPicker}
                        style={styles.input} editable={false} selectTextOnFocus={false}>
                        {this.state.chosenDate}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={styles.inputText}>{strings('PasseiosClienteScreen.justification')}</Text>
                    <Form>
                      <Textarea style={styles.largeInput} rowSpan={5} bordered placeholder={strings('PasseiosClienteScreen.whyReschedule')} />
                    </Form>
                  </View>
                  <View style={styles.espalhar}>
                    <Button style={styles.botaoCancela} onPress={() => {
                                  this.setState({ clicked: "9" });
                                }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>{strings('PasseiosClienteScreen.back')}</Text>
                    </Button>
                    <Button style={styles.botaoConfirma}>
                      <Text style={{ color: 'white', fontSize: 12 }}>{strings('PasseiosClienteScreen.reschedule')}</Text>
                    </Button>
                  </View>
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
        // ----------------FIM DA TELA DE REMARCAR  PASSEIO
      } else if (this.state.clicked == strings('PasseiosClienteScreen.cancelWalk')) {  //-------------------- TELA CANCELAR PASSEIO
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
            <Header style={{ backgroundColor: 'red', marginTop: 25}}>
                <Left><Icon style={{ marginHorizontal: 10}} name='arrow-back' onPress={() => this.setState({ clicked: "9" })}/> </Left>
                <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('PasseiosClienteScreen.cancelWalk')}</Title></Body>
              </Header>
              <Content padder style={{ backgroundColor: 'white' }}>
                <ScrollView>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={styles.inputText}>{strings('PasseiosClienteScreen.justification')}</Text>
                    <Form>
                      <Textarea style={styles.largeInput} rowSpan={5} bordered placeholder={strings('PasseiosClienteScreen.whyCancel')}/>
                    </Form>
                  </View>
                  <View style={styles.espalhar}>
                    <Button style={styles.botaoCancela} onPress={() => {this.setState({ clicked: "9" })}}>
                      <Text style={{ color: 'white', fontSize: 16 }}>{strings('PasseiosClienteScreen.back')}</Text>
                    </Button>
                    <Button style={styles.botaoConfirma}>
                      <Text style={{ color: 'white', fontSize: 16 }}>{strings('PasseiosClienteScreen.cancel')}</Text>
                    </Button>
                  </View>
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
      } else {
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
              <Header style={{ backgroundColor: 'red', marginTop: 25}}>
                <Left><Icon name='arrow-back' style={{ marginHorizontal: 10}} onPress={() => navigate('MenuClienteScreen')}/></Left>
                <Body><Title style={{ marginHorizontal: 10, color: Colors.snow }}>{strings('PasseiosClienteScreen.scheduledWalks')}</Title></Body>
              </Header>
              <Content padder style={{ backgroundColor: 'white' }}>
                <ScrollView>
                  <List dataArray={this.state.dataArrayPasseios}
                    renderRow={(item) =>
                      <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                          <Text>{item}</Text>
                          {/*<Button transparent dark
                            onPress={() =>
                              ActionSheet.show(
                                {
                                  options: BUTTONS,
                                  cancelButtonIndex: CANCEL_INDEX,
                                  title: strings('PasseiosClienteScreen.scheduledWalks')
                                },
                                buttonIndex => {
                                  this.setState({ clicked: BUTTONS[buttonIndex] });
                                }
                              )}
                          >
                            <Icon type='Ionicons' name='ios-paw' />
                              </Button>*/}
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
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasseiosClienteScreen)
