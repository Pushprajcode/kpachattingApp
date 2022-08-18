import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {normalize, vh, vw} from '../utiles/dimensions';
import COLORS from '../utiles/colors';

export default function CustomButton(props: any) {
  const {onPress, style, label, labelExtraStyle} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[styles.containerView, style]}>
      <Text style={[styles.buttonText, labelExtraStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerView: {
    height: vh(48),
    width: vw(328),
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.LIGHT_BLUE,
    alignSelf: 'center',
    marginTop: normalize(10),
  },
  buttonText: {
    color: COLORS.WHITE,
    fontWeight: '600',
  },
});
