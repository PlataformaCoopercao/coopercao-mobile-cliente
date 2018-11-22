import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import {Container, Header, Title, Content, Body, Text, Icon, CheckBox, Textarea,
  Left, Right, Accordion, Root, Button, ActionSheet, Subtitle, Card,
   CardItem, List, Footer, FooterTab, Badge, Form, Item, Label, Input,
   Picker, Spinner, Thumbnail, Col, Grid, Row, ListItem, InputGroup, DatePicker
} from 'native-base'
import { Font, AppLoading, Expo } from "expo"
import { StackNavigator } from "react-navigation"
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Images, Colors } from '../Themes';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';

class PacotesPasseioScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoading: true, // to load font in expo
      clicked: '',
      edited: '',
      selectedItem: undefined,
      selected: 'key0',
      weekSelected: 'week0',
      dogSelected: 'dog0',
      results: {
          items: [],
      },
      chosenDate: new Date(),
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    };
    this.setDate = this.setDate.bind(this);
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onWeekChange(value: string) {
    this.setState({
      weekSelected: value
    });
  }
  onDogChange(value: string) {
    this.setState({
      dogSelected: value
    });
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
  render () {
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
        <Container>
          <Header style={{backgroundColor:'red'}}>
            <Left>
              <Icon name='arrow-back'/>
            </Left>
            <Body>
              <Title>Agendar Pacote de Passeio</Title>
            </Body>
          </Header>

          <Content style={{alignContent:"stretch"}}>
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
                 placeHolderText="Selecione a data inicial 📅"
                 textStyle={{ color: "black" }}
                 placeHolderTextStyle={{ color: "grey" }}
                 onDateChange={this.setDate}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Form>
                <Text>Quantidade de semanas</Text>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.weekSelected}
                  onValueChange={this.onWeekChange.bind(this)}
                >
                  <Picker.Item label="1" value="week0" />
                  <Picker.Item label="2" value="week1" />
                  <Picker.Item label="3" value="week2" />
                  <Picker.Item label="4" value="week3" />
                  <Picker.Item label="5" value="week4" />
                  <Picker.Item label="6" value="week5" />
                  <Picker.Item label="7" value="week6" />
                  <Picker.Item label="8" value="week7" />
                  <Picker.Item label="9" value="week8" />
                  <Picker.Item label="10" value="week9" />
                </Picker>
              </Form>
            </ListItem>
            <ListItem>
              <Text>Dias e horários:</Text>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.monday}
              onPress={() => this.setState({ monday: !this.state.monday})}
              color="red"
            />
            <Body>
              <Text>Segunda-feira</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.tuesday}
              onPress={() => this.setState({ tuesday: !this.state.tuesday})}
              color="red"
            />
            <Body>
              <Text>Terça-feira</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.wednesday}
              onPress={() => this.setState({ wednesday: !this.state.wednesday})}
              color="red"
            />
            <Body>
              <Text>Quarta-feira</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.thursday}
              onPress={() => this.setState({ thursday: !this.state.thursday})}
              color="red"
            />
            <Body>
              <Text>Quinta-feira</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.friday}
              onPress={() => this.setState({ friday: !this.state.friday})}
              color="red"
            />
            <Body>
              <Text>Sexta-feira</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.saturday}
              onPress={() => this.setState({ saturday: !this.state.saturday})}
              color="red"
            />
            <Body>
              <Text>Sábado</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
            <ListItem>
            <CheckBox
              checked={this.state.sunday}
              onPress={() => this.setState({ sunday: !this.state.sunday})}
              color="red"
            />
            <Body>
              <Text>Domingo</Text>
            </Body>
            <InputGroup>
              <Text>Hora: </Text>
              <Input placeholder='hh:mm; hh:mm;' />
            </InputGroup>
            </ListItem>
      {/* A HORA DEVE SER SELECIONADA POR UM TIMEPICKER OU UTILIZANDO UMA MASK NO INPUT */}
            <ListItem>
            <Form>
                <Text>Escolha seu cachorro</Text>
                <Picker
                  mode="dropdown"
                  selectedValue={this.state.dogSelected}
                  onValueChange={this.onDogChange.bind(this)}
                >
                  <Picker.Item label="Cerberus" value="dog0" />
                  <Picker.Item label="Orthrus" value="dog1" />
                  <Picker.Item label="CuSith" value="dog2" />
                  <Picker.Item label="Will" value="dog3" />
                </Picker>
              </Form>
            </ListItem>
      {/* INSERIR OPÇÃO DE PÔR MAIS CACHORROS */}
          </List>
          <Body>
            <Item>
              <Label customLabel>Observações</Label>
            </Item>
          </Body>
          <Form>
           <Textarea style={{backgroundColor: 'lightgrey', borderColor:'black'}} rowSpan={5} bordered dark placeholder="Deixe seus comentários aqui" />
          </Form>
          <Button style={{ alignSelf:"center", marginTop: 20, marginBottom: 20, backgroundColor:'red' }}>
            <Text>Pedir pacote</Text>
          </Button>
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