import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Workout from "../screens/Workout";
import Settings from "../screens/Settings";
import FoodDiet from "../screens/FoodDiet";
import Profile from "../screens/Profile";
import { KeyboardAvoidingView, Platform } from 'react-native';
import FAwesome5 from "react-native-vector-icons/FontAwesome5";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#b6d877',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarStyle: {
                        backgroundColor: '#303642',
                        borderTopWidth: 0,
                        elevation: 0, // for Android
                        shadowOpacity: 0, // for iOS
                    },
                    tabBarShowLabel: false,
                }}
            >
                <Tab.Screen
                    name="Workout"
                    component={Workout}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <FAwesome5 name="dumbbell" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="FoodDiet"
                    component={FoodDiet}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="food-fork-drink" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <AntDesign name="profile" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={Settings}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <SLIcons name="settings" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </KeyboardAvoidingView>
    );
}
