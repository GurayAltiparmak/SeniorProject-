import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { checkAuth } from '../api/authAPI';

const Profile = () => {
  const [userFullName, setUserFullName] = useState('');
  const [userWeight, setWeight] = useState('');
  const [userHeight, setHeight] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await checkAuth();
        if (response.authenticated) {
          // Oturum açmış kullanıcının tam adını al
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>

      </View>
          
          <Text style={styles.fullName}>{userFullName}</Text>
        
          <View style={styles.measurementsContainer}>
           <Text style={styles.measurementsLabel}>Boy:</Text>
           <Text style={styles.measurements}>{userHeight} cm</Text>
         </View>
        
         <View style={styles.measurementsContainer}>
           <Text style={styles.measurementsLabel}>Kilo:</Text>
           <Text style={styles.measurements}>{userWeight} kg</Text>
         </View>
      
      

      <View style={styles.body}>
        <View style={styles.measurementsContainer}>
          <Text style={styles.measurementsLabel}>Boy:</Text>
          <Text style={styles.measurements}>{userHeight} cm</Text>
        </View>
        <View style={styles.measurementsContainer}>
          <Text style={styles.measurementsLabel}>Kilo:</Text>
          <Text style={styles.measurements}>{userWeight} kg</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Kilo Girişi')}>
          <Text style={styles.buttonText}>Kilo Girişi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('BMI Hesaplayıcı')}>
          <Text style={styles.buttonText}>BMI Hesaplayıcı</Text>
        </TouchableOpacity>
      </View>
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
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  measurementsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  measurementsLabel: {
    fontSize: 15,
    color: '#666',
    marginRight: 10,
  },
  measurements: {
    fontSize: 14,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#b71515',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
