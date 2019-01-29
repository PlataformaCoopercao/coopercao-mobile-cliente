import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Container, Header, Title, Content, Body, Text, Icon, CheckBox, Textarea,
  Left, Button,
  List, Footer, FooterTab, Form, Item, Label, Input,
  Picker, Spinner, ListItem, InputGroup, DatePicker
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { strings } from '../locales/i18n';
import axios from 'axios';
import * as firebase from 'firebase';
import { Alert } from 'react-native'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images, Colors } from '../Themes';

const resposta = [];

class PacotesPasseioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'key0',
      weekSelected: '1',
      dogSelected: {},
      dogs: [],
      dog: 'Nenhum',
      address: {},
      obs: '',
      chosenDate: new Date(),
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      loaded: false,
      horaMon: '',
      horaTue: '',
      horaWed: '',
      horaWed: '',
      horaThu: '',
      horaFri: '',
      horaSat: '',
      horaSun: '',
    };
    this.setDate = this.setDate.bind(this);
  }
  //onValueChange(value: string) {
  //  this.setState({
  //   selected: value
  //  });
  //}

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onWeekChange(value: string) {
    this.setState({
      weekSelected: value
    });
  }

  carregarDogs() {
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/clientDog';
    this.setState({loaded:false});
    axios.post(url, { owner_id: firebase.auth().currentUser.uid })
      .then((response) => {
        for (i = 0; i < response.data.length; i++) {
          this.state.dogs[i] =
            response.data[i].name;
        }
        resposta = response.data;
        this.setState({loaded:true});
        this.forceUpdate();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  getOwnerAddress() {
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/getClient';
    axios.post(url, { id: firebase.auth().currentUser.uid })
      .then((response) => {
          this.setState({ address: response.data.address })
        }
      )
      .catch((error) => {
        Alert.alert(error.message);
      });
  }

  postarPasseio(data, temp){
    var url =  'https://us-central1-coopercao-backend.cloudfunctions.net/newWalk';
    //console.log('{"walk": { "address": '+this.state.address+', "dog": '+this.state.dog+',"date": '+data+', "time": '+temp+', "value": '+'20'+', "walk_type":'+'Pacote A } }');
    axios.post(url, {
      walk: {
        address: this.state.address,
        dog : this.state.dogSelected,
        date : data,
        time : temp,
        value : '20',
        walk_type : 'Pacote A',
        owner_month_year : this.state.dogSelected.owner + '_'+ this.state.chosenDate.getMonth()+1 + '_' + this.state.chosenDate.getFullYear(),
        obs_client: this.state.obs
      }
    })
    .then(() => {
      Alert.alert(strings("PacotesPasseioScreen.scheduledWalks"));
      this.props.navigation.navigate('MenuClienteScreen');
    })
    .catch((error) => {
      Alert.alert(error.message);
    });

  }



  agendarPacote() {

    for(i=0;i<resposta.length;i++){
      if(i==this.state.dog){
        this.state.dogSelected = resposta[i];
      }
    }
    var url = 'https://us-central1-coopercao-backend.cloudfunctions.net/newWalk';
    this.getOwnerAddress();
    var weekday = this.state.chosenDate.getDay();
    var data = this.state.chosenDate;
    for(i=0;i<parseInt(this.state.weekSelected);i++){

      for(j=0, k = weekday; j < 7; j++, k++){

         if(k==0 && this.state.sunday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaSun);
         }
         else if(k==1 && this.state.monday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaMon);
         }
         else if(k==2 && this.state.tuesday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaTue);
         }
         else if(k==3 && this.state.wednesday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaWed);
         }
         else if(k==4 && this.state.thursday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaThu);
         }
         else if(k==5 && this.state.friday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaFri);
         }
         else if(k==6 && this.state.saturday){
          var day=data.getDate();
          var month=data.getMonth();
          month=month+1;
          if((String(day)).length==1)
          day='0'+day;
          if((String(month)).length==1)
          month='0'+month;
          dateT=day+ '.' + month + '.' + data.getFullYear();
          this.postarPasseio(dateT, this.state.horaSat);
         }

         data.setDate(data.getDate()+1);

        if(k == 6){
          k = -1;
        }
      }
    }



  }

  // required to load native-base font in expo
  async componentWillMount() {
    this.getOwnerAddress();
    this.carregarDogs();
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ fontLoading: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    if (!this.state.loaded) {
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
        <Container style={{ backgroundColor: 'white' }}>
          <Header style={{ backgroundColor: 'red', marginTop: 22 }}>
            <Left>
              <Icon name='arrow-back' style={{ width: 40 }} onPress={() => navigate('MenuClienteScreen')} />
            </Left>
            <Body>
              <Title style={{ color: Colors.snow, left: -90 }}>{strings('PacotesPasseioScreen.schedulePackage')}</Title>
            </Body>
          </Header>

          <Content style={{ alignContent: "stretch" }}>
            <List>
              <ListItem>
                <InputGroup>
                  <DatePicker
                    defaultDate={new Date()}
                    minimumDate={new Date()}
                    maximumDate={new Date(2018, 12, 31)}
                    //locale={"en"}
                    timeZoneOffsetInMinutes={undefined}
                    modalTransparent={false}
                    animationType={"fade"}
                    androidMode={"default"}
                    placeHolderText={strings("PacotesPasseioScreen.chooseDateTime")}
                    textStyle={{ color: "black" }}
                    placeHolderTextStyle={{ color: "grey" }}
                    onDateChange={this.setDate}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <Form>
                  <Text>{strings("PacotesPasseioScreen.weeksQuantity")}</Text>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.weekSelected}
                    onValueChange={this.onWeekChange.bind(this)}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                    <Picker.Item label="8" value="8" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="10" value="10" />
                  </Picker>
                </Form>
              </ListItem>
              <ListItem>
                <Text>{strings('PacotesPasseioScreen.dateTime')}</Text>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.monday}
                  onPress={() => this.setState({ monday: !this.state.monday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.monday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaMon: text }) }}/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.tuesday}
                  onPress={() => this.setState({ tuesday: !this.state.tuesday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.tuesday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaTue: text }) }} />
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.wednesday}
                  onPress={() => this.setState({ wednesday: !this.state.wednesday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.wednesday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaWed: text }) }}/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.thursday}
                  onPress={() => this.setState({ thursday: !this.state.thursday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.thursday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaThu: text }) }}/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.friday}
                  onPress={() => this.setState({ friday: !this.state.friday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.friday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaFri: text }) }}/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.saturday}
                  onPress={() => this.setState({ saturday: !this.state.saturday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.saturday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaSat: text }) }}/>
                </InputGroup>
              </ListItem>
              <ListItem>
                <CheckBox
                  checked={this.state.sunday}
                  onPress={() => this.setState({ sunday: !this.state.sunday })}
                  color="red"
                />
                <Body>
                  <Text>{strings("PacotesPasseioScreen.sunday")}</Text>
                </Body>
                <InputGroup>
                  <Text>{strings("PacotesPasseioScreen.hour")} </Text>
                  <Input placeholder='hh:mm; hh:mm;' onChangeText={(text) => { this.setState({ horaSun: text }) }}/>
                </InputGroup>
              </ListItem>
              {/* A HORA DEVE SER SELECIONADA POR UM TIMEPICKER OU UTILIZANDO UMA MASK NO INPUT */}
              <ListItem>
                <Form>
                  <Text>{strings("PacotesPasseioScreen.chooseDog")}</Text>
                  <Picker
                    mode="dropdown"
                    selectedValue={this.state.dog}
                    onValueChange={(value) => {
                      this.setState({ dog: value });
                    }}>
                    {this.state.dogs.map((item, index) => {
                      return (<Picker.Item label={item} value={index} key={index} />)
                    })}
                  </Picker>
                </Form>
              </ListItem>
              {/* INSERIR OPÇÃO DE PÔR MAIS CACHORROS */}
            </List>
            <Body>
              <Item>
                <Label customLabel>{strings("PacotesPasseioScreen.comments")}</Label>
              </Item>
            </Body>
            <Form>
              <Textarea style={{ backgroundColor: 'lightgrey', borderColor: 'black' }} rowSpan={5} bordered dark placeholder={strings("PacotesPasseioScreen.leaveComments")}
              onChangeText={(text) => { this.setState({ obs: text }) }} />
            </Form>
            <Button style={{ alignSelf: "center", marginTop: 20, marginBottom: 20, backgroundColor: 'red' }}
            onPress={() => this.agendarPacote()}>
              <Text>{strings("PacotesPasseioScreen.askPackage")}</Text>
            </Button>
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
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(PacotesPasseioScreen)
