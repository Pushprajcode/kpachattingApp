import {AppState} from 'react-native';
import SignUp from '../screens/signup';
import ROUTE_NAMES from './routeNames';
import {useSelector} from 'react-redux';
import Profile from '../screens/profile';
import HomeScreen from '../screens/home';
import LoginScreen from '../screens/logIn';
import SplashScreen from '../screens/splashScreen';
import Chatscreen from '../screens/chats/chatscreen';
import firestore from '@react-native-firebase/firestore';
import React, {useRef, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlluserList from '../screens/chats/alluserList';
import {store} from '../redux/reducer/store';

const stack = createNativeStackNavigator();

const NavigationScreen = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  const {uidLogInuser} = useSelector((store: any) => store.LoginReducer);
  console.log('uid', uidLogInuser);

  const uid = uidLogInuser;

  useEffect(() => {
    console.log('first------->', uid);
    {
      if (uid)
        firestore().collection('Users').doc(uid).update({
          isActive: true,
        });
    }
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        firestore().collection('Users').doc(uid).update({
          isActive: 'Online',
        });
      } else {
        firestore().collection('Users').doc(uid).update({
          isActive: 'Offline',
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
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen
          name={ROUTE_NAMES.SPLASH_SCREEN}
          component={SplashScreen}
        />

        <stack.Screen
          name={ROUTE_NAMES.LOG_IN_SCREEN}
          component={LoginScreen}
        />
        <stack.Screen name={ROUTE_NAMES.SIGN_Up} component={SignUp} />
        <stack.Screen name={ROUTE_NAMES.PROFILE} component={Profile} />
        <stack.Screen name={ROUTE_NAMES.HOME} component={HomeScreen} />
        <stack.Screen name={ROUTE_NAMES.CHAT_SCREEN} component={Chatscreen} />
        <stack.Screen
          name={ROUTE_NAMES.ALLUSER_SCREEN}
          component={AlluserList}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};
export default NavigationScreen;
