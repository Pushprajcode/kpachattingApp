import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../utiles/images';

export default function Custombackbutton(props:any) {
  const{style}=props
  const navigation = useNavigation<any>();
  return (
    <View style={styles.containerView}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image style={[styles.backimg,style]} source={IMAGES.BACK_IMAGE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  backimg: {
    height: 30,
    width: 30,
    marginTop: 40,
    marginLeft: 10,
  },
});
