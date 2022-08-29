import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Chats from '../screens/chats';
import LoginScreen from '../screens/logIn';
import Status from '../screens/status';

const TopTabCategory = createMaterialTopTabNavigator();
export default function TopTabCategoryFn() {
  return (
    <TopTabCategory.Navigator
      screenOptions={{
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: '#3B0000',
        tabBarIndicatorStyle: {backgroundColor: 'transparent'},
        tabBarContentContainerStyle: {
          backgroundColor: '#43919B',
          borderColor: '#247881',
          borderStartWidth: 2,
          borderEndWidth: 2,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '700',
        },
      }}>
      <TopTabCategory.Screen name="Chats" component={Chats} />
      <TopTabCategory.Screen name="Status" component={Status} />
      <TopTabCategory.Screen name="call" component={LoginScreen} />
    </TopTabCategory.Navigator>
  );
}
