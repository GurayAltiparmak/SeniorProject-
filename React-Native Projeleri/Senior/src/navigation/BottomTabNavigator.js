import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Workout from "../screens/Workout";
import Settings from "../screens/Settings";
import FoodDiet from "../screens/FoodDiet";
import Profile from "../screens/Profile";
import FAwesome5 from "react-native-vector-icons/FontAwesome5";
import SLIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: '#999',
                tabBarInactiveBackgroundColor: '#ff7171',
                tabBarActiveBackgroundColor: '#eb2525',
            }}>

            <Tab.Screen name="Workout" component={Workout} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<FAwesome5 name="dumbbell" size={24} color={"white"} />) }} />
            <Tab.Screen name="FoodDiet" component={FoodDiet} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="food-fork-drink" size={24} color={"white"} />) }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<AntDesign name="profile" size={24} color={"white"} />) }} />
            <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false, tabBarShowLabel: false, tabBarIcon: ({ color, size }) => (<SLIcons name="settings" size={24} color={'white'} />) }} />

        </Tab.Navigator>
    );
}
