import React from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Workout = () => {
  const navigation = useNavigation();

  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>FotoDiet</Text>
      </View>

      <ScrollView style={styles.scrollMenu} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigateTo("BackDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/backDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Back</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("ChestDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/chestDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Chest</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("BicepsDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/bicepsDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Biceps</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("ShoulderDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/shoulderDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Shoulder</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("TricepsDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/tricepDays.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Triceps</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("LegDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/legDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Leg</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateTo("AbsDayWorkoutList")} style={styles.movementContainer}>
          <ImageBackground source={require('../assets/images/BodyParts/absDay.png')} style={styles.partsBackground}>
            <Text style={styles.containerInText}>Abs</Text>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Workout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303642',
  },
  headerContainer: {
    height: 65,
    backgroundColor: '#303642',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#303642',
  },
  headerText: {
    fontSize: 29,
    color: '#b6d877',
    fontWeight: 'bold',
    marginTop: 20,
    textTransform: 'uppercase', 
    letterSpacing: 4, 
  },
  scrollMenu: {
    flex: 1,
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  movementContainer: {
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  partsBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#303642',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 80,
  },
});
