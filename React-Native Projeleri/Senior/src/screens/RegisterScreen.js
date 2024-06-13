import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { registerAuth } from '../api/authAPI';
import { ImageBackground } from 'react-native';


export default function RegisterScreen() {

  const navigation = useNavigation();

  const [fullname, setFullname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegisterUser = async () => {
    if (fullname === '' || email === '' || password === '') {
      console.warn("Please enter all the fields.")
    } else {
      const response = await registerAuth(fullname, email, password)
      console.log("Register response", response)
      if (response.success) {
        navigation.navigate("LoginScreen")
      } else {
        console.warn(response.message)
      }
    }
  }

  const handleLoginScreen = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode='strech'
        style={styles.backImg}
        source={require('../assets/images/gymgirisfotosu.png')}
      >
        
        <View style={styles.overlay}>
        
          <Text style={styles.title}>Join<Text style={{color:'#b71515' , fontSize: 27}}> Us!</Text></Text>
          <TextInput
            style={styles.inputFullname}
            placeholder='Fullname'
            placeholderTextColor={'#a3a3a3'}
            keyboardType='name-phone-pad'
            onChangeText={setFullname}
            value={fullname}
          />
          <TextInput
            style={styles.inputEmail}
            placeholder='E-mail'
            placeholderTextColor={'#a3a3a3'}
            keyboardType='email-address'
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={styles.inputPassword}
            placeholder='Password'
            placeholderTextColor={'#a3a3a3'}
            secureTextEntry
            onChangeText={setPassword}
            value={password}
          />

          <TouchableOpacity style={styles.buttonContainer} onPress={handleRegisterUser}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <Text style={styles.signinLabel}>Already a member. <Text style={styles.loginScreenButton} onPress={handleLoginScreen}>Sign In!</Text></Text>
        
        </View>

      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImg:{
    flex:1,
  },
  overlay:{
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0,3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#e0e0e0',
  },
  inputEmail: {
    width: '65%',
    height: 40,
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 5,
    paddingHorizontal: 20,
    color: '#a3a3a3',

  },
  inputFullname: {
    width: '65%',
    height: 40,
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 5,
    paddingHorizontal: 20,
    color: '#a3a3a3',

  },
  inputPassword: {
    width: '65%',
    height: 40,
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 30,
    paddingHorizontal: 20,
    color: '#a3a3a3',

  },
  buttonContainer: {
    width: '50%',
    height: 45,
    borderWidth: 1,
    backgroundColor: '#b71515',
    borderColor: '#7c2323',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight:'500',
  },
  signinLabel:{
    color:'#e3e3e3',
    fontSize: 10,
  },
  loginScreenButton: {
    color:'#b71515',
    fontSize: 15,
    fontWeight:'bold'
  },



});