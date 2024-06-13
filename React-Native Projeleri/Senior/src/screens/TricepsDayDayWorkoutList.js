import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Linking, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchExercisesByBodyPart } from '../api/exerciseDB';

const TricepsDayDayWorkoutList = () => {
  const navigation = useNavigation();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getBackExercises = async () => {
      try {
        const bodyPart = 'Triceps';
        const data = await fetchExercisesByBodyPart(bodyPart);
        setExercises(data);
        setLoading(false);
      } catch (error) {
        console.log("error: ", error);
        setLoading(false);
      }
    };

    getBackExercises();
  }, []);

  const renderExerciseItem = ({ item }) => {
    const beginnerSets = item['Beginner Sets'];
    const expertSets = item['Expert Sets'];
    const intermediateSets = item['Intermediate Sets'];

    return (
      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseName}>{item.WorkOut}</Text>
        <Text style={styles.exerciseDescription}>{item.Explaination}</Text>
        <Text style={styles.exerciseIntensity}>Intensity Level: {item.Intensity_Level}</Text>
        <Text style={styles.exerciseBeginnerSet}>For Beginners: {beginnerSets}</Text>
        <Text style={styles.exerciseExperSet}>For Expert: {expertSets}</Text>
        <Text style={styles.exerciseInetmediateSet}>For Intermediates: {intermediateSets}</Text>

        <Text style={styles.additionalInfoText}>You can check your form</Text>
        <TouchableOpacity onPress={() => handleVideoLinkPress(item.Video)}>
          <Text style={styles.exerciseVideo}>{item.Video}</Text>
        </TouchableOpacity>
      </View>
    );
  };


  const renderSeparator = () => (
    <View style={styles.separator} />
  );

  const handleVideoLinkPress = (videoLink) => {
    Linking.openURL(videoLink);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#ff6f61" style={styles.loadingIndicator} />
      ) : (
        <>
          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderSeparator}
          />
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
            <Text style={styles.goBackButtonText}>Back</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  goBackButton: {
    backgroundColor: '#ff6f61',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  goBackButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exerciseContainer: {
    backgroundColor: '#212121',
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#dddddd',
    marginBottom: 8,
  },
  exerciseIntensity: {
    fontSize: 12,
    color: '#cccccc',
  },
  separator: {
    width: '100%',
    backgroundColor: '#333333',
  },
  exerciseVideo: {
    fontSize: 12,
    color: '#bebebe',
    marginTop: 2,
    textDecorationLine: 'underline',
  },
  additionalInfoText: {
    color: '#bebebe',
    fontSize: 12,
    marginTop: 20,
    textAlign: 'center',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInetmediateSet: {
    fontSize: 12,
    color: '#cccccc',
  },
  exerciseExperSet: {
    fontSize: 12,
    color: '#cccccc',
  },
  exerciseBeginnerSet: {
    fontSize: 12,
    color: '#cccccc',
    marginTop: 10,
  },
});


export default TricepsDayDayWorkoutList
