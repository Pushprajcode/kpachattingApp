import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import Chats from '../screens/chats';
import LoginScreen from '../screens/logIn';
import Status from '../screens/status';
import COLORS from '../utiles/colors';

const TopTabCategory = createMaterialTopTabNavigator();
export default function TopTabCategoryFn() {
  return (
    <TopTabCategory.Navigator
      screenOptions={{
        tabBarInactiveTintColor: COLORS.WHITE,
        tabBarActiveTintColor: COLORS.LIGHT_RED,
        tabBarIndicatorStyle: {backgroundColor: 'transparent'},
        tabBarContentContainerStyle: {
          backgroundColor: COLORS.SUMMER,
          borderColor: COLORS.LIGHT_SKYBLUE,
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
