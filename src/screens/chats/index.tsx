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
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import COLORS from '../../utiles/colors';

export default function Chats({route}: any) {
  const navigation = useNavigation<any>();
  const {uid} = useSelector((store: any) => store.LoginReducer);
  const [user, setUser] = useState();
  const getUsersDetails = async () => {
    const querySnap = await firestore().collection('Users').get();
    const alluser: any = querySnap.docs.map(docSnap => docSnap.data());
    setUser(alluser);
  };
  useEffect(() => {
    getUsersDetails();
  }, []);


  const onrender = ({item}: any) => {
    console.log('itmem', item);
    const img=item.profileImage
    console.log(img)
    return item.uid!= uid ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(ROUTE_NAMES.CHAT_SCREEN, {
            Name: item?.name,
            Uid: item?.uid,
            status: item?.isActive,
            profileImage:item?.profileImage,
          })
        }
        style={styles.itemStyle}>
        <Image style={styles.profileImg}
        source={{uri:img}}/>
        <Text style={styles.textName}>{item.name}</Text>
      </TouchableOpacity>
    ) : null;
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
    padding: 10,
    backgroundColor: '#F0D9E7',
    borderBottomWidth: 1,
    borderBottomColor:COLORS.BLACK,
    borderRadius: 20,
    borderRightWidth: 1,
    flexDirection:'row',
    marginVertical:6
  },
  main: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  textName: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '600',
    left: 30,
    paddingVertical: 10,
    color: '#40394A',
  },
  profileImg:{height:50,width:50,borderRadius:100,backgroundColor:'aqua'}
});
