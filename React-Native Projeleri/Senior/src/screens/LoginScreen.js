import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { loginAuth, checkAuth } from '../api/authAPI';


export default function LoginScreen() {

  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  /*eğer log out yapmazsam uygulama çalışır çalışmaz giriş yapılacak*/
  React.useEffect(() => {
    const checkLoginAuth = async () => {
      const response = await checkAuth();
      console.log("Check auth response", response)
      if (response.authenticated) {
        navigation.navigate("BottomTabNavigator", {
          "screen": "Workout"
        })
      }
    }

    checkLoginAuth()
  }, [])
  
  /* Kullanıcı girişi fonksiyonu */
  const handleLoginUser = async () => {
    if (email === '' || password === '') {
      console.warn("Please enter all the fields.")
    } else {
      const response = await loginAuth(email, password)
      console.log("Login response: ", response)
      if (response.success) {
        navigation.navigate("BottomTabNavigator", {
          "screen": "Workout"
        })
      } else {
        console.warn(response.message)
      }
    }
  }
  /* Kayıt olma ekranına yönlendirme fonksiyonu */
  const handleRegisterScreen = () => {
    navigation.navigate("RegisterScreen")
  }


  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode='stretch'
        style={styles.backImg}
        source={require('../assets/images/Login.png')}
      >
        <View style={styles.overlay}>
          <Text style={styles.textLabel} >Be The Best <Text style={{ color: '#b71515', fontSize: 45 }} >Version</Text> Of You</Text>

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

          <TouchableOpacity style={styles.buttonContainer} onPress={handleLoginUser}>
            <Text style={styles.btnText}> Sign In </Text>
          </TouchableOpacity>
          <Text style={styles.registerTextLabel}>Not a member,Let's Join Us.<Text onPress={handleRegisterScreen} style={styles.registerText}> Here!</Text></Text>


        </View>
      </ImageBackground>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImg: {
    flex: 1,

  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0,3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 50,
  },

  textLabel: {
    fontSize: 38,
    marginBottom: 3,
    color: '#bababa',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 15,

  },
  inputEmail: {
    width: '70%',
    height: 40,
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 5,
    paddingHorizontal: 20,
    color: '#a3a3a3',

  },
  inputPassword: {
    width: '70%',
    height: 40,
    borderColor: '#a3a3a3',
    borderWidth: 1,
    borderRadius: 18,
    marginBottom: 30,
    paddingHorizontal: 20,
    color: '#a3a3a3',

  },
  buttonContainer: {
    borderWidth: 1,
    width: '50%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 7,
    backgroundColor: '#b71515',
    borderColor: '#7c2323',

  },
  btnText: {
    fontSize: 30,
    color: '#e3e3e3',
    fontWeight: 'bold',
  },
  registerTextLabel:{
    color:'gray',
    fontSize: 13,
    marginBottom: 40,

  },
  registerText:{
    color:'#b71515',
    fontSize: 17,

  },

});