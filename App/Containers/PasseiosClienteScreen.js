import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Form, Textarea, Root, Button, ActionSheet, Subtitle, Card, CardItem, List, Footer, FooterTab, Badge, Spinner
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { strings } from '../locales/i18n';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PasseiosClienteScreenStyle'

var BUTTONS = ["Remarcar Passeio", "Cancelar Passeio", "Voltar"];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;
const dataArrayPasseios = [
  'Data: 12/12/2018    Horário: 10:00\nCão: Barghest\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Garmr\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Will\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: CuSith\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Fenrir\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Inugami\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Anubis\nCusto: R$20,00\nPasseador: Amon\nRua dos Bobos, nº 0'
];
var tam = dataArrayPasseios.length

class PasseiosClienteScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: 9,
      edited: '',
      chosenDate: '',
      isVisible: false
    };
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
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  componentWillUpdate() {

  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <Container style={{ backgroundColor: 'red' }}>
          <Header style={{ backgroundColor: 'red', marginTop: 22 }} />
          <Content>
            <Spinner color='red' />
          </Content>
        </Container>
      );
    }
    else {
      if (this.state.clicked == "Remarcar Passeio") { // ------------TELA REMARCAR PASSEIO
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
              <Header style={{ backgroundColor: 'red'}}>
                <Left><Icon name='arrow-back' onPress={() => this.setState({ clicked: "9" })} /></Left>
                <Body><Title style={{ left: -90, color: Colors.snow }}>Remarcar Passeio</Title></Body>

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
                    <Text style={styles.inputText}>Escolha data e hora:</Text>
                    <View style={styles.flexContainer}>
                      <Text onPress={this.showPicker}
                        style={styles.input} editable={false} selectTextOnFocus={false}>
                        {this.state.chosenDate}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={styles.inputText}>Justificativa: </Text>
                    <Form>
                      <Textarea style={styles.largeInput} rowSpan={5} bordered placeholder='Terei que remarcar o passeio pois...' />
                    </Form>
                  </View>
                  <View style={styles.espalhar}>
                    <Button style={styles.botaoCancela} onPress={() => {
                                  this.setState({ clicked: "9" });
                                }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>Voltar</Text>
                    </Button>
                    <Button style={styles.botaoConfirma}>
                      <Text style={{ color: 'white', fontSize: 16 }}>Remarcar</Text>
                    </Button>
                  </View>
                </ScrollView>
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
          </Root>
        )
        // ----------------FIM DA TELA DE REMARCAR  PASSEIO
      } else if (this.state.clicked == "Cancelar Passeio") {  //-------------------- TELA CANCELAR PASSEIO
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
              <Header style={{ backgroundColor: 'red'}}>
                <Left><Icon name='arrow-back' onPress={() => this.setState({ clicked: "9" })}/> </Left>
                <Body><Title style={{ left: -90, color: Colors.snow }}>Cancelar Passeio</Title></Body>

              </Header>
              <Content padder style={{ backgroundColor: 'white' }}>
                <ScrollView>
                  <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={styles.inputText}>Justificativa: </Text>
                    <Form>
                      <Textarea style={styles.largeInput} rowSpan={5} bordered placeholder='Estou cancelando o passeio porque...' />
                    </Form>
                  </View>
                  <View style={styles.espalhar}>
                    <Button style={styles.botaoCancela} onPress={() => {
                                  this.setState({ clicked: "9" });
                                }}>
                      <Text style={{ color: 'white', fontSize: 16 }}>Voltar</Text>
                    </Button>
                    <Button style={styles.botaoConfirma}>
                      <Text style={{ color: 'white', fontSize: 16 }}>Cancelar</Text>
                    </Button>
                  </View>
                </ScrollView>
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
          </Root>
        )
        // -------------------------- FIM DA TELA DE CANCELAR PASSEIO
      } else {
        return (
          <Root>
            <Container style={{ backgroundColor: 'red' }}>
              <Header style={{ backgroundColor: 'red'}}>
                <Left><Icon name='arrow-back' onPress={() => navigate('MenuClienteScreen')}/></Left>
                <Body><Title style={{ left: -90, color: Colors.snow }}>Passeios Agendados</Title></Body>

              </Header>
              <Content padder style={{ backgroundColor: 'white' }}>
                <ScrollView>
                  <List dataArray={dataArrayPasseios}
                    renderRow={(item) =>
                      <Card>
                        <CardItem style={{ justifyContent: 'space-between' }}>
                          <Text>{item}</Text>
                          {<Button transparent dark
                            onPress={() =>
                              ActionSheet.show(
                                {
                                  options: BUTTONS,
                                  cancelButtonIndex: CANCEL_INDEX,
                                  title: "Passeios Agendados"
                                },
                                buttonIndex => {
                                  this.setState({ clicked: BUTTONS[buttonIndex] });
                                }
                              )}
                          >
                            <Icon type='Ionicons' name='ios-paw' />
                          </Button>}
                        </CardItem>
                      </Card>
                    }>
                  </List>
                </ScrollView>
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
