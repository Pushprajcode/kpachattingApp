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
import { IMAGES } from '../../utiles/images';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerView}>
        <Text>{'KPA Chat'}</Text>
        <Image style={styles.settingimg}
        source={IMAGES.SETTING_IMAGE}/>
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
  settingimg:{
    height:20
  }
});
