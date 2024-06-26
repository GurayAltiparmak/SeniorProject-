import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { checkAuth } from '../api/authAPI';
import { Picker } from '@react-native-picker/picker';
import { fetchBMIFromInputs } from '../api/dailyCalandBMIAPI';

const Profile = () => {
  const [userFullName, setUserFullName] = useState('');
  const [userWeight, setWeight] = useState('');
  const [userHeight, setHeight] = useState('');
  const [inputWeight, setInputWeight] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('female');
  const [pregnancyLactating, setPregnancyLactating] = useState('none');
  const [activityLevel, setActivityLevel] = useState('Inactive');
  const [bmiData, setBmiData] = useState(null);
  const [dailyCalorie, setDailyCalorie] = useState(null);
  const [pregnantWeeks, setPregnantWeeks] = useState('');
  const [prePregnantWeight, setPrePregnantWeight] = useState('');

  const scrollViewRef = useRef(null);

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

  const handleCalculateDailyCalorie = async () => {
    if (!age || !inputHeight || !inputWeight) {
      alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    try {
      let data;
      if (pregnancyLactating === 'pregnant') {
        if (!pregnantWeeks || !prePregnantWeight) {
          alert('Missing Information', 'Please fill in all required fields for pregnancy.');
          return;
        }
        data = await fetchBMIFromInputs(sex, age, inputHeight, inputWeight, pregnancyLactating, activityLevel, pregnantWeeks, prePregnantWeight);
      } else {
        if (!['Low Active', 'Very Active', 'Active', 'Inactive'].includes(activityLevel)) {
          alert('Invalid Information', 'Please select a valid activity level.');
          return;
        }
        data = await fetchBMIFromInputs(sex, age, inputHeight, inputWeight, pregnancyLactating, activityLevel);
      }

      console.log('BMI Data:', data);
      setBmiData(data.BMI_EER.BMI);
      setDailyCalorie(data.BMI_EER['Estimated Daily Caloric Needs']);
    } catch (error) {
      console.error('Error calculating daily calorie:', error);
      alert('Error', 'Failed to calculate daily calorie. Please try again later.');
    }
  };

  const renderResults = () => {
    if (bmiData !== null && dailyCalorie !== null) {
      return (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>BMI: {bmiData}</Text>
          <Text style={styles.resultText}>Daily Calorie You Need To Take: {dailyCalorie}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.value}>{userFullName}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}> {userHeight} cm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}> {userWeight} kg</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.radioContainer}>
          <Text style={styles.radioLabel}>Sex:  </Text>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'female' && styles.activeRadioButton]}
            onPress={() => {
              setSex('female');
              setPregnancyLactating('none');
            }}
          >
            <Text style={[styles.radioText, sex === 'female' && styles.activeRadioText]}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioButton, sex === 'male' && styles.activeRadioButton]}
            onPress={() => {
              setSex('male');
              setPregnancyLactating('none');
            }}
          >
            <Text style={[styles.radioText, sex === 'male' && styles.activeRadioText]}>Male</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Pregnancy / Lactating:</Text>
          <Picker
            selectedValue={pregnancyLactating}
            style={[styles.dropdown, sex === 'male' && { opacity: 0.5 }]}
            enabled={sex !== 'male'}
            onValueChange={(itemValue) => {
              setPregnancyLactating(itemValue);
            }}
          >
            <Picker.Item label="None" value="none" />
            <Picker.Item label="Pregnant" value="pregnant" />
            <Picker.Item label="Lactating 1st" value="lactating1st" />
            <Picker.Item label="Lactating 2nd" value="lactating2nd" />
          </Picker>
        </View>

        {pregnancyLactating === 'pregnant' && (
          <View style={styles.pregnancyContainer}>
            <TextInput
              style={styles.input}
              placeholder="Pregnant Week"
              keyboardType="numeric"
              value={pregnantWeeks}
              onChangeText={(text) => {
                setPregnantWeeks(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Weight Before Pregnancy"
              keyboardType="numeric"
              value={prePregnantWeight}
              onChangeText={(text) => {
                setPrePregnantWeight(text);
              }}
            />
          </View>
        )}

        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Activity Level:</Text>
          <Picker
            selectedValue={activityLevel}
            style={styles.dropdown}
            onValueChange={(itemValue) => {
              setActivityLevel(itemValue);
            }}
          >
            <Picker.Item label="Inactive" value="Inactive" />
            <Picker.Item label="Low Active" value="Low Active" />
            <Picker.Item label="Active" value="Active" />
            <Picker.Item label="Very Active" value="Very Active" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={(text) => {
            setAge(text);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Height"
          keyboardType="numeric"
          value={inputHeight}
          onChangeText={(text) => {
            setInputHeight(text);
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Weight"
          keyboardType="numeric"
          value={inputWeight}
          onChangeText={(text) => {
            setInputWeight(text);
          }}
        />
      </View>

      <TouchableOpacity style={styles.calorieButton} onPress={handleCalculateDailyCalorie}>
        <Text style={styles.calorieButtonText}>Calculate Daily Calorie</Text>
      </TouchableOpacity>

      {renderResults()}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#361518',
  },
  infoContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 2,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#361518',
  },
  value: {
    fontSize: 16,
    color: '#361518',
  },
  inputContainer: {
    marginBottom: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioLabel: {
    fontSize: 16,
    color: '#361518',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  activeRadioButton: {
    backgroundColor: '#b6d877',
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 10,
    color: '#361518',
  },
  activeRadioText: {
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#361518',
  },
  dropdown: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#361518',
  },
  pregnancyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    color: '#361518',
  },
  calorieButton: {
    backgroundColor: '#b6d877',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  calorieButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#361518',
  },
});

export default Profile;
