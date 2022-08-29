import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Text} from 'react-native';
import Chats from '../screens/chats';
import LoginScreen from '../screens/logIn';
import Status from '../screens/status';


const TopTabCategory = createMaterialTopTabNavigator();

// const TabarlabelStyle = (label: any) => {
//   return {
//     tabBarLabel: ({focused}: {focused: any}) => {
//       if (focused) {
//         return <Text style={{color: 'black', fontWeight: '900',marginTop:0}}>{label}</Text>;
//       } else {
//         return <Text style={{color: 'grey'}}>{label}</Text>;
//       }
//     },
//   };
// };
export default function TopTabCategoryFn() {
  return (
    <TopTabCategory.Navigator
      screenOptions={{
        
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor:'#3B0000',
        tabBarIndicatorStyle: {backgroundColor: 'transparent'},
          tabBarContentContainerStyle:{
            backgroundColor:'#43919B',
            borderColor:'#247881',
            borderStartWidth:2,
            borderEndWidth:2,
          },
          tabBarLabelStyle:{
            fontSize:14,
            fontWeight:'700'
          }


      }}>
      <TopTabCategory.Screen
        name="Chats"
        component={Chats}
        // options={TabarlabelStyle('chats')}
      />
      <TopTabCategory.Screen
        name="Status"
        component={Status}
        // options={TabarlabelStyle('STATUS')}
      />
        <TopTabCategory.Screen
        name="call"
        component={LoginScreen}
        // options={TabarlabelStyle('STATUS')}
      />
   
    </TopTabCategory.Navigator>
  );
}