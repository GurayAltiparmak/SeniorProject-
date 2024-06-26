import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { checkAuth } from '../api/authAPI';

const Profile = () => {
  const [userFullName, setUserFullName] = useState('');
  const [userWeight, setWeight] = useState('');
  const [userHeight, setHeight] = useState('');
  const [measurementUnit, setMeasurementUnit] = useState('std'); // std or met
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('female'); // female or male
  const [pregnancyLactating, setPregnancyLactating] = useState('none'); // none, pregnant, lactating1st, lactating2nd
  const [activityLevel, setActivityLevel] = useState('Inactive'); // Inactive, Low Active, Active, Very Active

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await checkAuth();
        if (response.authenticated) {
          const { user } = response;
          setUserFullName(user.fullname);
          setWeight(user.kilo);
          setHeight(user.boy);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleMeasurementUnitChange = (unit) => {
    setMeasurementUnit(unit);
    // Clear weight and height when switching units
    setWeight('');
    setHeight('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.fullNameContainer}>
        <Text style={styles.fullName}>{userFullName}</Text>
      </View>

      <View style={styles.measurementsContainer}>
        <Text style={styles.measurementsText}>Height: {userHeight} {measurementUnit === 'std' ? 'feet' : 'cm'}</Text>
        <Text style={styles.measurementsText}>Weight: {userWeight} {measurementUnit === 'std' ? 'ibs' : 'kg'}</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.measurementUnitContainer}>
          <TouchableOpacity
            style={[styles.measurementUnitButton, measurementUnit === 'std' && styles.activeMeasurementButton]}
            onPress={() => handleMeasurementUnitChange('std')}
          >
            <Text style={[styles.measurementUnitButtonText, measurementUnit === 'std' && styles.activeMeasurementButtonText]}>STD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.measurementUnitButton, measurementUnit === 'met' && styles.activeMeasurementButton]}
            onPress={() => handleMeasurementUnitChange('met')}
          >
            <Text style={[styles.measurementUnitButtonText, measurementUnit === 'met' && styles.activeMeasurementButtonText]}>MET</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => setAge(text)}
        />

        <View style={styles.radioContainer}>
          <Text>Sex:</Text>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'female' && styles.activeRadioButton]}
            onPress={() => setSex('female')}
          >
            <Text style={[styles.radioText, sex === 'female' && styles.activeRadioText]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'male' && styles.activeRadioButton]}
            onPress={() => setSex('male')}
          >
            <Text style={[styles.radioText, sex === 'male' && styles.activeRadioText]}>Male</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkboxContainer}>
          <Text>Pregnancy / Lactating:</Text>
          <TouchableOpacity
            style={[styles.checkbox, pregnancyLactating === 'none' && styles.activeCheckbox]}
            onPress={() => setPregnancyLactating('none')}
          >
            <Text style={[styles.checkboxText, pregnancyLactating === 'none' && styles.activeCheckboxText]}>None</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, pregnancyLactating === 'pregnant' && styles.activeCheckbox]}
            onPress={() => setPregnancyLactating('pregnant')}
          >
            <Text style={[styles.checkboxText, pregnancyLactating === 'pregnant' && styles.activeCheckboxText]}>Pregnant</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, pregnancyLactating === 'lactating1st' && styles.activeCheckbox]}
            onPress={() => setPregnancyLactating('lactating1st')}
          >
            <Text style={[styles.checkboxText, pregnancyLactating === 'lactating1st' && styles.activeCheckboxText]}>Lactating 1st</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkbox, pregnancyLactating === 'lactating2nd' && styles.activeCheckbox]}
            onPress={() => setPregnancyLactating('lactating2nd')}
          >
            <Text style={[styles.checkboxText, pregnancyLactating === 'lactating2nd' && styles.activeCheckboxText]}>Lactating 2nd</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityLevelContainer}>
          <Text>Activity Level:</Text>
          <TouchableOpacity
            style={[styles.activityLevelButton, activityLevel === 'Inactive' && styles.activeActivityLevelButton]}
            onPress={() => setActivityLevel('Inactive')}
          >
            <Text style={[styles.activityLevelButtonText, activityLevel === 'Inactive' && styles.activeActivityLevelButtonText]}>Inactive</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.activityLevelButton, activityLevel === 'Low Active' && styles.activeActivityLevelButton]}
            onPress={() => setActivityLevel('Low Active')}
          >
            <Text style={[styles.activityLevelButtonText, activityLevel === 'Low Active' && styles.activeActivityLevelButtonText]}>Low Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.activityLevelButton, activityLevel === 'Active' && styles.activeActivityLevelButton]}
            onPress={() => setActivityLevel('Active')}
          >
            <Text style={[styles.activityLevelButtonText, activityLevel === 'Active' && styles.activeActivityLevelButtonText]}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.activityLevelButton, activityLevel === 'Very Active' && styles.activeActivityLevelButton]}
            onPress={() => setActivityLevel('Very Active')}
          >
            <Text style={[styles.activityLevelButtonText, activityLevel === 'Very Active' && styles.activeActivityLevelButtonText]}>Very Active</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.calorieButton} onPress={() => console.log('Calculate Daily Calorie')}>
        <Text style={styles.calorieButtonText}>Calculate Daily Calorie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  fullNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  measurementsContainer: {
    marginTop: 20,
  },
  measurementsText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  measurementUnitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  measurementUnitButton: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  measurementUnitButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeMeasurementButton: {
    backgroundColor: '#b71515',
  },
  activeMeasurementButtonText: {
    color: '#fff',
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  radioText: {
    fontSize: 14,
    color: '#333',
  },
  activeRadioButton: {
    backgroundColor: '#b71515',
  },
  activeRadioText: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
  },
  activeCheckbox: {
    backgroundColor: '#b71515',
  },
  activeCheckboxText: {
    color: '#fff',
  },
  activityLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  activityLevelButton: {
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  activityLevelButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeActivityLevelButton: {
    backgroundColor: '#b71515',
  },
  activeActivityLevelButtonText: {
    color: '#fff',
  },
  calorieButton: {
    backgroundColor: '#b71515',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  calorieButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
