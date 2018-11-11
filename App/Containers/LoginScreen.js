import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View,
   ImageBackground, TouchableOpacity, Button, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Images, Colors } from '../Themes'
import { TextInput } from 'react-native-gesture-handler';

class LoginScreen extends Component {
  render () {
    return (
      
        <KeyboardAvoidingView behavior='position'>
          <View style={styles.logoContainer} >
            <Image source = {Images.logoCoopercao} style={styles.logo}/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>Login</Text>
            <TextInput placeholder={'Email'} placeholderTextColor={Colors.coal} style={styles.input}/>
          </View>

          <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Senha</Text>
            <TextInput style={styles.input}
             placeholder={'senha'} secureTextEntry={true} placeholderTextColor={Colors.coal}/>
          </View>
          
          <TouchableOpacity style ={styles.btnEntrar} >
            <Text style={styles.textEntrar}>Entrar</Text>
          </TouchableOpacity>
          <View>
          <TouchableOpacity style ={styles.btnOutros} >
            <Text style={styles.textOutros}>Primeiro Acesso</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.btnOutros} >
            <Text style={styles.textOutros}>Esqueci minha senha</Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
