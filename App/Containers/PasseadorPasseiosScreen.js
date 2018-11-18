import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card, CardItem, List, Footer, FooterTab, Badge
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { Colors } from '../Themes/'
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/PasseadorPasseiosScreenStyle'

var BUTTONS = ["Iniciar Passeio", "Requisitar Substituição", "Cancelar Passeio", "Cancelar"];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;
const dataArrayPasseios = [
  'Data: 12/12/2018    Horário: 10:00\nCão: Barghest\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Garmr\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Will\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: CuSith\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Fenrir\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Inugami\nRua dos Bobos, nº 0',
  'Data: 12/12/2018    Horário: 10:00\nCão: Anubis\nRua dos Bobos, nº 0'
];
var tam = dataArrayPasseios.length
class PasseadorPasseiosScreen extends Component {
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

  render() {
    if (this.state.fontLoading) {
      return (
        <AppLoading />
      );
    } else {
      return (
        <Root>
          <Container>
            <Header>
              <Left><Icon name='arrow-back' /></Left>
              <Body><Title dark>Passeios Atribuidos</Title></Body>
            </Header>
            <Content padder>
              <ScrollView>
                <List dataArray={dataArrayPasseios}
                  renderRow={(item) =>
                    <Card>
                      <CardItem style={{justifyContent: 'space-between'}}>
                      <Text>{item}</Text>
                      {<Button transparent dark
                        onPress={() =>
                          ActionSheet.show(
                            {
                              options: BUTTONS,
                              cancelButtonIndex: CANCEL_INDEX,
                              title: "Passeio"
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
              <Footer>
                <FooterTab>
                  <Button>
                    <Icon name='person'/>
                    <Text>Perfil</Text>
                  </Button>
                  <Button>
                    <Icon name='md-calendar'/>
                    <Text>Histórico</Text>
                  </Button>
                  <Button badge vertical>
                    <Badge info><Text>2</Text></Badge>
                    <Icon name='list-box'/>
                    <Text>Atribuido</Text>
                  </Button>
                  <Button badge vertical>
                    <Badge info><Text>5</Text></Badge>
                    <Icon name='walk'/>
                    <Text>Livre</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PasseadorPasseiosScreen)
