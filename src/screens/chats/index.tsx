
import { StyleSheet, Text, View,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { store } from '../../redux/reducer/store';
import { useNavigation } from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';

export default function Chats() {
  const navigation=useNavigation<any>()
  const {uid}=useSelector(store=>store.LoginReducer)
  console.log('jouidusekrni hai',uid)
  const [user, setUser] = useState();
  const getUsersDetails = async () => {
    const querySnap = await firestore().collection('Users').where('uid','!=',uid).get()
    console.log('datajoaaya', querySnap);
    // const allUser=await firestore().collection()
    const alluser = querySnap.docs.map(docSnap => docSnap.data());
    console.log('allusersdetal', alluser);
    setUser(alluser);
  };
  useEffect(() => {
    getUsersDetails();
  }, []);
  const onrender = ({item}:any) => {
    console.log('itmeme', item);
    return(
      <View>
        <TouchableOpacity
        // onPress={()=>{
        //   navigation.navigate(ROUTE_NAMES.CHAT_SCREEN,{name:item?.name,uid:item.uid})
        // }}
        onPress={()=>
          navigation.navigate(ROUTE_NAMES.CHAT_SCREEN,{Name:item?.name,Uid:item?.uid})}
         style={styles.itemStyle}
        >
        <Text>
          {item.name}
        </Text>
        </TouchableOpacity>
       
      </View>
    )
  }
  return (
    <View>
      <FlatList data={user} renderItem={onrender}
      keyExtractor={({item})=>item} />
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle:{
    borderWidth:1,
    borderColor:'red',
    marginVertical:30
  }
})

function uid(arg0: string, arg1: string, uid: any) {
  throw new Error('Function not implemented.');
}
