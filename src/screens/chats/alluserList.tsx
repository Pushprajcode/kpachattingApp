import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {SafeAreaFrameContext} from 'react-native-safe-area-context';
import {normalize, vh, vw} from '../../utiles/dimensions';
import COLORS from '../../utiles/colors';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import Custombackbutton from '../../customComponents/custombackbutton';

export default function AlluserList() {
  const navigation = useNavigation<any>();
  const [alluser, setAllUsers] = useState<any>();
  const {loginUserId} = useSelector((store: any) => store.SignUpReducer);
  useEffect(() => {
    firestore()
      .collection('Users')
      .where('uid', '!=', loginUserId)
      .onSnapshot(onsnap => {
        const allUser = onsnap.docs.map(item => item.data());
        // console.log('dfgh', allUser);
        setAllUsers(allUser);
      });
  }, []);

  const _onrender = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ROUTE_NAMES.CHAT_SCREEN, {
            Name: item?.name,
            Uid: item?.uid,
            profileImage: item?.profileImage,
          });
        }}
        style={styles.allUserView}>
        <View style={styles.profileImageView}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={{uri: item.profileImage}}
          />
        </View>
        <View style={styles.userInfoView}>
          <Text style={styles.nameTextStyle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: 30}}>
      <Custombackbutton
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backbutton}
      />
      <FlatList data={alluser} renderItem={_onrender} />
    </View>
  );
}

const styles = StyleSheet.create({
  profileImgae: {
    height: vh(30),
    width: vw(30),
    borderRadius: normalize(30),
  },
  userlistStyle: {
    flexDirection: 'row',
    marginTop: normalize(30),
  },
  textName: {
    marginLeft: normalize(20),
  },
  userInfoView: {
    padding: normalize(10),
  },
  nameTextStyle: {
    fontSize: normalize(18),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  separatorView: {
    height: normalize(1),
    backgroundColor: COLORS.DARK_GREY,
    opacity: normalize(0.5),
    marginHorizontal: normalize(6),
  },
  allUser: {
    height: normalize(30),
    width: normalize(30),
    marginLeft: normalize(320),
    bottom: 30,
  },
  profileImageView: {
    height: normalize(60),
    width: normalize(60),
    backgroundColor: 'green',
    borderRadius: normalize(30),
    overflow: 'hidden',
  },
  allUserView: {
    flexDirection: 'row',
    marginTop: normalize(50),
  },
  backbutton: {
    marginLeft: normalize(10),
  },
});
