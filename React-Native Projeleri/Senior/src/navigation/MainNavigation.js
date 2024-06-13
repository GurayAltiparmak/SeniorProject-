import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import BackDayWorkoutList from '../screens/BackDayWorkoutList';
import ChestDayWorkoutList from '../screens/ChestDayWorkoutList';
import BicepsDayWorkoutList from '../screens/BicepsDayWorkoutList';
import ShoulderDayWorkoutList from '../screens/ShoulderDayWorkoutList';
import TricepsDayWorkoutList from '../screens/TricepsDayDayWorkoutList';
import LegDayWorkoutList from '../screens/LegDayWorkoutList';
import AbsDayWorkoutList from '../screens/AbsDayWorkoutList';

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator  initialRouteName= 'LoginScreen' >
                <Stack.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
                <Stack.Screen options={{headerShown: false}} name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen options={{headerShown: false}} name="BackDayWorkoutList" component={BackDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="ChestDayWorkoutList" component={ChestDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="BicepsDayWorkoutList" component={BicepsDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="ShoulderDayWorkoutList" component={ShoulderDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="TricepsDayWorkoutList" component={TricepsDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="LegDayWorkoutList" component={LegDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}}name ="AbsDayWorkoutList" component={AbsDayWorkoutList}/>
                <Stack.Screen options={{headerShown: false}} name="BottomTabNavigator" component={BottomTabNavigator}/>
            </Stack.Navigator>

        </NavigationContainer>
    );
}