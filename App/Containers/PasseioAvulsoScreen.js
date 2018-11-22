import React, { Component } from 'react'
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Checkbox } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown';
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card, CardItem, List, Footer, FooterTab, Badge
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import CheckBox from 'react-native-check-box'

import { Images, Colors } from '../Themes'
import { TextInput } from 'react-native-gesture-handler';

class TelaPasseioAvulsoScreen extends Component {

  constructor() {
    super()
    this.state = {
      fontLoading: true, // to load font in expo
      isVisible: false,
      chosenDate: '',
      isChecked: false,
    }
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
      let data = [
        {
          value: 'Will',
        }, {
          value: 'Larry',
        }, {
          value: 'Gabe',
        }, {
          value: 'Caramelo',
        }, {
          value: 'Cerberus',
        }, {
          value: 'Orthrus',
        }, {
          value: 'CuSith',
        }, {
          value: 'Garmr',
        }, {
          value: 'Fenrir',
        }, {
          value: 'Anubis',
        }, {
          value: 'Pluto',
        }];


      return (
        <Root>
          <Container>
            <Header>
              <Left><Icon name='arrow-back' /></Left>
              <Body><Title dark  style = {{left : -100}}>{strings('PasseioAvulsoScreen.singleWalks')}</Title></Body>
            </Header>
            <Content padder>
              <ScrollView style={styles.container}>
                <KeyboardAvoidingView behavior='position'>
                  <Text></Text>
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
                    <Text style={styles.inputText}>{strings('PasseioAvulsoScreen.chooseDateTime')}:</Text>
                    <View style={styles.flexContainer}>
                      <Text onPress={this.showPicker}
                        style={styles.input} editable={false} selectTextOnFocus={false}>
                        {this.state.chosenDate}
                      </Text>
                    </View>
                  </View>>
          <View style={styles.dropdowns}>

                    <Dropdown
                      label={strings('PasseioAvulsoScreen.singleWalkQuestion')}
                      data={data}
                    />
                  </View>

                  <View>
                    <Text></Text>
                    <Text></Text>
                    <CheckBox
                      style={styles.dropdowns}
                      onClick={() => {
                        this.setState({
                          isChecked: !this.state.isChecked
                        })
                      }}
                      isChecked={this.state.isChecked}
                      leftText={strings('PasseioAvulsoScreen.enableAddress')}
                    />
                    <Text></Text>
                    <Text></Text>

                    <View style={styles.inputContainer}>
                      <TextInput style={styles.inputEndereco} editable={this.state.isChecked} />
                    </View>

                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputText}> </Text>
                    <Text style={styles.inputText}>{strings('General.comments')}</Text>
                    <TextInput multiline style={styles.inputObsTxt}
                      placeholder={''} placeholderTextColor={Colors.coal} />
                  </View>
                  <View style={styles.btns}>
                    <TouchableOpacity style={styles.btnEntrar} >
                      <Text style={styles.textEntrar}>{strings('General.confirm_button')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnVoltar} >
                      <Text style={styles.textEntrar}>{strings('General.back_button')}</Text>
                    </TouchableOpacity>
                  </View>

                </KeyboardAvoidingView>
              </ScrollView>
            </Content>
            <Footer style={{backgroundColor:'red'}}>
                <FooterTab style={{backgroundColor:'red'}}>
                  <Button>
                    <Icon name='person' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.profile_button')}</Text>
                  </Button>
                  <Button onPress={() => navigate('HistoricoPasseadorScreen')}>
                    <Icon name='md-calendar' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.history_button')}</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseadorPasseiosScreen')}>
                    <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>2</Text></Badge>
                    <Icon name='list-box' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.assign_button')}</Text>
                  </Button>
                  <Button badge vertical onPress={() => navigate('PasseiosLivresScreen')}>
                  <Badge style={{backgroundColor:'black'}}><Text style={{color:'white'}}>7</Text></Badge>
                    <Icon name='walk' style={{color:'white'}}/>
                    <Text style={{color:'white'}}>{strings('Footer.available_button')}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TelaPasseioAvulsoScreen)
