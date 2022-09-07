import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import TopTabCategoryFn from '../../router/toptabnavigation';
import {IMAGES} from '../../utiles/images';
import {firebase} from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import {useDispatch} from 'react-redux';
import COLORS from '../../utiles/colors';
import {vh, vw} from '../../utiles/dimensions';
export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();
  const onpressSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');
        dispatch({type: 'SET_USER_UID', payload: {uidLogInuser: ''}});
        // dispatch({type: 'uid', payload: ''});
        navigation.navigate(ROUTE_NAMES.LOG_IN_SCREEN);
      })
      .catch(e => {
        console.error('Sign Out Error', e);
      });
  };
  return (
    <View style={styles.headerView}>
      <Text style={styles.headingtxt}>{'KPA Chat'}</Text>
      <TouchableOpacity onPress={onpressSignOut}>
        <Image style={styles.settingimg} source={IMAGES.LOG_OUT} />
      </TouchableOpacity>
      <TopTabCategoryFn />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#1984b0',
    flex: 1,
    paddingTop: 40,
  },

  headingtxt: {
    color: COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
    left: 10,
    top: 10,
  },
  settingimg: {
    height: vh(28),
    width: vw(28),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    bottom: 16,
    right: 7,
    fontSize: 18,
    color: 'white',
    tintColor: COLORS.WHITE,
  },
  touchable: {
    color: 'red',
  },
});
