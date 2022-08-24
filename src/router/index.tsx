import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signup';
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/logIn';
import ROUTE_NAMES from './routeNames';

import Profile from '../screens/profile';
import HomeScreen from '../screens/home';
import Chatscreen from '../screens/chats/chatscreen';

const stack = createNativeStackNavigator();

const NavigationScreen = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
      initialRouteName={ROUTE_NAMES.LON_IN_SCREEN}
       >
        {/* <stack.Screen
          name={ROUTE_NAMES.SPLASH_SCREEN}
          component={SplashScreen}
        /> */}
       
        <stack.Screen
          name={ROUTE_NAMES.LON_IN_SCREEN}
          component={LoginScreen}
        />
        <stack.Screen
          name={ROUTE_NAMES.SIGN_Up}
          component={SignUp}
        />
         {/* <stack.Screen
          name={ROUTE_NAMES.HOME}
          component={Home}
        /> */}
          <stack.Screen
          name={ROUTE_NAMES.PROFILE}
          component={Profile}
        />
          <stack.Screen
          name={ROUTE_NAMES.HOME}
          component={HomeScreen}
        />
           {/* <stack.Screen
          name={ROUTE_NAMES.COMPLETEPROFIL_POP_UP}
          component={ProfilePopUp}
        /> */}
           <stack.Screen
          name={ROUTE_NAMES.CHAT_SCREEN}
          component={Chatscreen}
        />
      </stack.Navigator>
      
    </NavigationContainer>
  );
};
export default NavigationScreen;
