import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {normalize} from '../utiles/dimensions';
import COLORS from '../utiles/colors';
import {IMAGES} from '../utiles/images';

export default function EyeButton(props: any) {
  const {style} = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.eyeView, style]}
      onPress={() => {
        setShowPassword(!showPassword);
      }}>
      {showPassword ? (
        <Image style={styles.eyeClose} source={IMAGES.EYE_CLOSE} />
      ) : (
        <Image style={styles.eyeOpen} source={IMAGES.EYE_OPEN} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eyeView: {
    height: normalize(20),
    width: normalize(20),
    position: 'absolute',
    top: normalize(22),
    right: normalize(6),
    zIndex: 1,
  },
  eyeClose: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    tintColor: COLORS.LIGHT_GREY,
  },
  eyeOpen: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    tintColor: COLORS.LIGHT_GREY,
  },
});
