import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React from 'react'
import { logout } from '../api/authAPI'
import { useNavigation } from '@react-navigation/native'


const Settings = () => {


  const navigation = useNavigation();
  const handleLogout = async () => {
    const response = await logout()
    console.log("Logout response", response)

    if (response.success) {
      navigation.navigate("LoginScreen")
    }
  }


  return (
    <View style = {styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#303642',
    padding: 20,
  },
  buttonContainer: {
    width: '80%',
    height: 50,
    backgroundColor: '#b6d877',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 27,
    color: 'white',
    fontWeight: '%500',
  },
})