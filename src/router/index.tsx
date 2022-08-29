import React, {useRef, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../screens/signup';
import SplashScreen from '../screens/splashScreen';
import LoginScreen from '../screens/logIn';
import ROUTE_NAMES from './routeNames';

import Profile from '../screens/profile';
import HomeScreen from '../screens/home';
import Chatscreen from '../screens/chats/chatscreen';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const {uid} = useSelector((store: any) => store.LoginReducer);
  // const user = await firestore().collection('Users').doc(Uid).get();

  useEffect(() => {
    firestore().collection('Users').doc(uid).update({
      isActive: true,
    });
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        firestore().collection('Users').doc(uid).update({
          isActive: true,
        });
      } else {
        firestore().collection('Users').doc(uid).update({
          isActive: false,
        });
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NavigationContainer>
      <stack.Navigator
        //initialRouteName={ROUTE_NAMES.LON_IN_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen
          name={ROUTE_NAMES.SPLASH_SCREEN}
          component={SplashScreen}
        />

        <stack.Screen
          name={ROUTE_NAMES.LON_IN_SCREEN}
          component={LoginScreen}
        />
        <stack.Screen name={ROUTE_NAMES.SIGN_Up} component={SignUp} />
        {/* <stack.Screen
          name={ROUTE_NAMES.HOME}
          component={Home}
        /> */}
        <stack.Screen name={ROUTE_NAMES.PROFILE} component={Profile} />
        <stack.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
        {/* <stack.Screen
          name={ROUTE_NAMES.COMPLETEPROFIL_POP_UP}
          component={ProfilePopUp}
        /> */}
        <stack.Screen name={ROUTE_NAMES.CHAT_SCREEN} component={Chatscreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationScreen;
