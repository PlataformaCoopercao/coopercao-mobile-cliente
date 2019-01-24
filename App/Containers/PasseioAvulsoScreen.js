import React, { Component } from 'react'
import { View, ScrollView, TouchableOpacity, Checkbox } from 'react-native'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'
import { Dropdown } from 'react-native-material-dropdown';
import {
  Container, Header, Title, Content, Body, Text, Icon,
  Left, Root, Button, Footer, FooterTab
} from 'native-base'
import { Font, AppLoading, Expo } from "expo";
import axios from 'axios';
import * as firebase from 'firebase';
import { Alert } from 'react-native';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { strings } from '../locales/i18n';
// Styles
import CheckBox from 'react-native-check-box'
import styles from './Styles/PasseioAvulsoScreenStyle'
import styles2 from './Styles/MenuClienteScreenStyle.js'
import { Images, Colors } from '../Themes'
import { TextInput } from 'react-native-gesture-handler';

const respostaDogs = [];

class TelaPasseioAvulsoScreen extends Component {

  constructor() {
    super()
    this.state = {
      fontLoading: true, // to load font in expo
      isVisible: false,
      chosenDate: '',
      date: '',
      month: '',
      year: '',
      time: '',
      isChecked: false,
      dogs: [],
      dog: 'Nenhum',
      dogSelected: {},
      obs: '',
      address: { cep: '', compl: '', district: '', num: '', street: '' }
    }
  }

  handlePicker = (datetime) => {
    this.state.date = moment(datetime).format('DD.MM.YYYY');
    this.state.time = moment(datetime).format('HH:mm');
    this.state.month = moment(datetime).format('MM');
    this.state.year = moment(datetime).format('YYYY');
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
    this.carregarDogs();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  carregarDogs() {
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/clientDogs';
    axios.post(url, { owner_id: firebase.auth().currentUser.uid })
      .then((response) => {
        for (i = 0; i < response.data.length; i++) {
          this.state.dogs[i] =
            response.data[i].name;
        }
        respostaDogs = response.data;
        this.forceUpdate();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  async getOwnerAddress() {
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/getClient';
    await axios.post(url, { id: firebase.auth().currentUser.uid })
      .then((response) => {
        this.state.address = response.data.address;
      }
      )
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  async postarPasseio() {
    if (this.state.isChecked == false) {
      await this.getOwnerAddress();
    }
    for (i = 0; i < respostaDogs.length; i++) {
      if (respostaDogs[i].name == this.state.dog) {
        this.state.dogSelected = respostaDogs[i];
      }
    }
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/newWalk';
    await axios.post(url, {
      walk: {
        address: this.state.address,
        dog: this.state.dogSelected,
        date: this.state.date,
        time: this.state.time,
        value: '20',
        walk_type: 'Avulso',
        owner_month_year: this.state.dogSelected.owner + '_' + this.state.month + '_' + this.state.year,
        obs_client: this.state.obs
      }
    })
      .then(() => {
        Alert.alert(strings('PasseioAvulsoScreen.success'));
        this.props.navigation.navigate('MenuClienteScreen');
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.fontLoading) {
      return (
        <AppLoading />
      );
    } else {
      let data = [];
      for (i = 0; i < this.state.dogs.length; i++) {
        data[i] = { value: this.state.dogs[i] };
      }
      return (
        <Root>
          <Container style={{ backgroundColor: 'red' }}>
            <Header style={{ backgroundColor: 'red', marginTop: 25 }}>
              <Left><Icon name='arrow-back' style={{ width: 40 }}
                onPress={() => navigate('MenuClienteScreen')} /></Left>
              <Body><Title style={{ color: Colors.snow, left: -90 }}>{strings('PasseioAvulsoScreen.oneWayWalk')}</Title></Body>

            </Header>
            <Content padder style={{ backgroundColor: 'white' }}>
              <ScrollView style={styles.container}>
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
                </View>
                <View style={styles.dropdowns}>

                  <Dropdown
                    label={strings('PasseioAvulsoScreen.singleWalkQuestion')}
                    data={data} onChangeText={(text) => { this.state.dog = text }}
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

                  <View style={styles.inputContainer}>
                    <TextInput style={styles.inputEndereco} placeholder={strings('PasseioAvulsoScreen.cep')}
                      editable={this.state.isChecked}
                      onChangeText={(value) => { this.state.address.cep = value }} />
                    <TextInput style={styles.inputEndereco} placeholder={strings('PasseioAvulsoScreen.district')}
                      editable={this.state.isChecked}
                      onChangeText={(value) => { this.state.address.district = value }} />
                    <TextInput style={styles.inputEndereco} placeholder={strings('PasseioAvulsoScreen.street')}
                      editable={this.state.isChecked}
                      onChangeText={(value) => { this.state.address.street = value }} />
                    <TextInput style={styles.inputEndereco} placeholder={strings('PasseioAvulsoScreen.number')}
                      editable={this.state.isChecked}
                      onChangeText={(value) => { this.state.address.num = value }} />
                    <TextInput style={styles.inputEndereco} placeholder={strings('PasseioAvulsoScreen.complement')}
                      editable={this.state.isChecked}
                      onChangeText={(value) => { this.state.address.compl = value }} />
                  </View>

                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputText}> </Text>
                  <Text style={styles.inputText}>{strings('General.comments')}</Text>
                  <TextInput multiline style={styles.inputObsTxt}
                    placeholder={''} placeholderTextColor={Colors.coal}
                    onChangeText={(value) => { this.state.obs = value }} />
                </View>
                <View style={styles.btns}>
                  <TouchableOpacity style={styles.btnEntrar} onPress={() => this.postarPasseio()}>
                    <Text style={styles.textEntrar}>{strings('General.confirm_button')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => navigate('MenuClienteScreen')} style={styles.btnVoltar} >
                    <Text style={styles.textEntrar}>{strings('General.back_button')}</Text>
                  </TouchableOpacity>
                </View>

              </ScrollView>
            </Content>
            <Footer style={{ backgroundColor: 'red' }}>
              <FooterTab style={{ backgroundColor: 'red' }}>
                <Button onPress={() => navigate('MenuClienteScreen')}>
                  <Icon name='md-person' type='Ionicons' style={{ color: 'white' }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TelaPasseioAvulsoScreen)
