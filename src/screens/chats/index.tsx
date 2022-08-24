import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {store} from '../../redux/reducer/store';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';

export default function Chats({route}: any) {
  const navigation = useNavigation<any>();
  const {uid} = useSelector((store: any) => store.LoginReducer);
  console.log('jouidusekrni hai', uid);
  const [user, setUser] = useState();
  console.log('Namenbkjn>>>>>>>>>', user);

  const getUsersDetails = async () => {
    const querySnap = await firestore()
      .collection('Users')
      .where('uid', '!=', uid)
      .get();
    console.log('datajoaaya', querySnap);
    const alluser: any = querySnap.docs.map(docSnap => docSnap.data());
    console.log('allusersdetal', alluser);
    setUser(alluser);
  };
  useEffect(() => {
    getUsersDetails();
  }, []);
  const onrender = ({item}: any) => {
    console.log('itmeme', item);
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(ROUTE_NAMES.CHAT_SCREEN, {
              Name: item?.name,
              Uid: item?.uid,
            })
          }
          style={styles.itemStyle}>
          {item.uid != uid ? <Text>{item.name}</Text> : null}
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={user}
        renderItem={onrender}
        keyExtractor={({item}) => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemStyle: {
    //borderWidth: 1,
    borderColor: 'red',
    marginVertical: 20,
    height: 90,
    width: 100,
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    left: 20,
  },
  main:{
    backgroundColor:'red',
    flex:1
}
});

function uid(arg0: string, arg1: string, uid: any) {
  throw new Error('Function not implemented.');
}
