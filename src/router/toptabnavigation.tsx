import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Text} from 'react-native';
import Chats from '../screens/chats';
import LoginScreen from '../screens/logIn';
import Status from '../screens/status';


const TopTabCategory = createMaterialTopTabNavigator();

const TabarlabelStyle = (label: any) => {
  return {
    tabBarLabel: ({focused}: {focused: any}) => {
      if (focused) {
        return <Text style={{color: 'black', fontWeight: '900',marginTop:0}}>{label}</Text>;
      } else {
        return <Text style={{color: 'grey'}}>{label}</Text>;
      }
    },
  };
};
export default function TopTabCategoryFn() {
  return (
    <TopTabCategory.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'blue',
        tabBarIndicatorStyle: {backgroundColor: 'black'},
        swipeEnabled: false,
      }}>
      <TopTabCategory.Screen
        name="Women"
        component={Chats}
        options={TabarlabelStyle('chats')}
      />
      <TopTabCategory.Screen
        name="Men"
        component={Status}
        options={TabarlabelStyle('STATUS')}
      />
        <TopTabCategory.Screen
        name="Me"
        component={LoginScreen}
        options={TabarlabelStyle('STATUS')}
      />
   
    </TopTabCategory.Navigator>
  );
}