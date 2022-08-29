import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopTabCategoryFn from '../../router/toptabnavigation';
import {IMAGES} from '../../utiles/images';
import {firebase} from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const onpressSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');
        navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
      })
      .catch(e => {
        console.error('Sign Out Error', e);
      });
  };
  return (
    <View style={styles.headerView}>
      <Text style={styles.headingtxt}>{'KPA Chat'}</Text>
      <TouchableOpacity onPress={onpressSignOut}>
        <Image style={styles.settingimg} source={IMAGES.SETTING_IMAGE} />
      </TouchableOpacity>
      <TopTabCategoryFn />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#247881',
    flex: 1,
    paddingTop: 40,
  },

  headingtxt: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    left: 10,
    top: 10,
  },
  settingimg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    bottom: 16,
    right: 10,
    tintColor: 'white',
  },
  touchable: {
    color: 'red',
  },
});
