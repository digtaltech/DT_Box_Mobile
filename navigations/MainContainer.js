import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import DataScreen from './screen/DataScreen';
import QRScreen from './screen/QRScreen';
import InfoScreen from './screen/InfoScreen';
import MainScreen from './screen/MainScreen';

//Screen names
const homeName = "Data";
const scanName = "QR Scan";
const settingsName = "Info";
const mainName = "Main";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={scanName}
        screenOptions={({ route }) => ({
          "tabBarActiveTintColor" : "#2C7BE5",
          "tabBarInactiveTintColor" : "#12263F",
          "tabBarLabelStyle" : {
            "paddingBottom": 3,
            "fontSize": 10
          },
          "tabBarStyle" : [
            {
              "display": "flex"
            },
            null
          ],
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'albums' : 'albums-outline';

            } else if (rn === scanName) {
              iconName = focused ? 'scan' : 'scan-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'help-circle' : 'help-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        >

        <Tab.Screen name={homeName} component={DataScreen} />
        <Tab.Screen name={scanName} component={QRScreen} />
        <Tab.Screen name={settingsName} component={InfoScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
