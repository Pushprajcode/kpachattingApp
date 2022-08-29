import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {store} from '../../redux/reducer/store';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import storage from '@react-native-firebase/storage';

export default function Chats({route}: any) {
  const navigation = useNavigation<any>();
  const {uid} = useSelector((store: any) => store.LoginReducer);
  const {url} = useSelector((store: any) => store.profileReducer);
  console.log('43988945898435789345789457845', url);
  console.log('jouidusekrni hai', uid);
  const [user, setUser] = useState();
  const getUsersDetails = async () => {
    const querySnap = await firestore()
      .collection('Users')
      //  .where('uid', '!=', uid)
      .get();
    const alluser: any = querySnap.docs.map(docSnap => docSnap.data());
    console.log('allusersdetal', alluser);
    setUser(alluser);
  };
  useEffect(() => {
    getUsersDetails();
  }, []);
  const onrender = ({item}: any) => {
    console.log('itmem', item);
    return item.uid != uid ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROUTE_NAMES.CHAT_SCREEN, {
            Name: item?.name,
            Uid: item?.uid,
            status:item?.isActive
          })
        }
        style={styles.itemStyle}>
        <Text style={styles.textName}>{item.name}</Text>
      </TouchableOpacity>
    ) : null;
  };
  return (
    <View style={styles.main}>
      {/* <Image
        style={{height: 100, width: 100, borderRadius: 20, marginLeft: 200}}
        source={{uri: url}}
      /> */}
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
padding:10,
backgroundColor:'#F0D9E7',
borderBottomWidth:1,
borderBottomColor:'black',
borderRadius:20,
borderRightWidth:1,
// borderLeftWidth:1

  },
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  textName:{
    fontSize:14,
    fontStyle:'italic',
    fontWeight:'600',
    left:30,
    paddingVertical:10,
    color:'#40394A'
  }
});

function uid(arg0: string, arg1: string, uid: any) {
  throw new Error('Function not implemented.');
}
