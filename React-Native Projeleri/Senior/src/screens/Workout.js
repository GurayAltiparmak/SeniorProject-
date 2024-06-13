import { StyleSheet, Text, View, ScrollView, ImageBackground, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Workout = () => {
  const navigation = useNavigation();
  const goBackPage = () => {
    navigation.navigate("BackDayWorkoutList");
  }
  const goChestPage = () => {
    navigation.navigate("ChestDayWorkoutList");
  }
  const goBicepsPage = () => {
    navigation.navigate("BicepsDayWorkoutList");
  }
  const goShoulderPage = () => {
    navigation.navigate("ShoulderDayWorkoutList");
  }
  const goTricepsPage = () => {
    navigation.navigate("TricepsDayWorkoutList");
  }
  const goLegPage = () => {
    navigation.navigate("LegDayWorkoutList");
  }
  const goAbsDay = () => {
    navigation.navigate("AbsDayWorkoutList");
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Welcome </Text>
      </View>
      
      <View>
       
        <ScrollView style={styles.scrollMenu}>

          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goBackPage} style={styles.touchContainer}>
              <ImageBackground source={require('../assets/images/BodyParts/backDay.png')} style={styles.partsBackground}>
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Back</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goChestPage} style={styles.touchContainer}>
              <ImageBackground source={require('../assets/images/BodyParts/chestDay.png')} style={styles.partsBackground}>
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Chest</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>


          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goBicepsPage} style={styles.touchContainer}>
              <ImageBackground
                source={require('../assets/images/BodyParts/bicepsDay.png')}
                style={styles.partsBackground}
                resizeMode='cover'
              >
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Biceps</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>


          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goShoulderPage} style={styles.touchContainer}>
              <ImageBackground
                source={require('../assets/images/BodyParts/shoulderDay.png')}
                style={styles.partsBackground}
                resizeMode='cover'
              >
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Shoulder</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goTricepsPage} style={styles.touchContainer}>
              <ImageBackground
                source={require('../assets/images/BodyParts/tricepDays.png')}
                style={styles.partsBackground}
                resizeMode='cover'
              >
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Triceps</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>


          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goLegPage} style={styles.touchContainer}>
              <ImageBackground
                source={require('../assets/images/BodyParts/legDay.png')}
                style={styles.partsBackground}
                resizeMode='cover'
              >
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>Leg</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>


          <View style={styles.movementContainer}>
            <TouchableOpacity onPress={goAbsDay} style={styles.touchContainer}>
              <ImageBackground
                source={require('../assets/images/BodyParts/absDay.png')}
                style={styles.partsBackground}
                resizeMode='cover'
              >
                <View style={styles.containerInPhoto}>
                  <Text style={styles.containerInText}>ABS</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

        </ScrollView>
        
      </View>

    </View>
    
  )
}

export default Workout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    borderWidth: 1,
    justifyContent: 'flex-start',
    width: '%100',
    height: 45,
    backgroundColor: '#eb2525',
    borderColor: '#ff2525'

  },
  headerText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center'
  },
  scrollMenu: {
    flexGrow: 1,
    position:'relative',
    marginBottom: 43,
  },
  movementContainer: {
    borderWidth: 1,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  touchContainer: {
    flex: 1,
  },
  partsBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInPhoto: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  containerInText: {
    fontSize: 35,
    fontWeight: '220',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  }
})
