import {StyleSheet, TextInput} from 'react-native';
import React from 'react';
import COLORS from '../utiles/colors';
import {normalize, vh, vw} from '../utiles/dimensions';

export default function CustomTextInput(props: any) {
  const {value, onChangeText, placeholder, style, secureTextEntry} = props;

  return (
    <TextInput
      style={[styles.textInput, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.LIGHT_SKY}
      secureTextEntry={secureTextEntry}
    />
  );
}
const styles = StyleSheet.create({
  textInput: {
    height: vh(48),
    width: vw(328),
    borderWidth: normalize(0.6),
    borderColor: COLORS.SKY,
    color: COLORS.SKY,
    backgroundColor: COLORS.WHITE,
    borderRadius:5
  },
});
