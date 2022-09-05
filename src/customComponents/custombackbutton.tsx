import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMAGES} from '../utiles/images';

export default function Custombackbutton(props: any) {
  const {style, onPress} = props;
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={[styles.backimg, style]} source={IMAGES.BACK_IMAGE} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backimg: {
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 10,
  },
});
