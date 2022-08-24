import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopTabCategoryFn from '../../router/toptabnavigation';
import firestore from '@react-native-firebase/firestore';
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
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerView}>
        <Text>{'KPA Chat'}</Text>
        <TouchableOpacity onPress={onpressSignOut}>
          <Image style={styles.settingimg} source={IMAGES.SETTING_IMAGE} />
        </TouchableOpacity>
      </View>
      <TopTabCategoryFn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerView: {
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  settingimg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    bottom: 8,
    right: 5,
  },
});
