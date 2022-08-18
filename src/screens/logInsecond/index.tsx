import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../utiles/colors';
import STRINGS from '../../utiles/strings';
import {normalize} from '../../utiles/dimensions';
import {IMAGES} from '../../utiles/images';
import CustomTextInput from '../../customComponents/customTextInput';

export default function LogInSecond() {
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.containerView}>
        <Text style={styles.helloText}>{STRINGS.HELLO_AGAIN}</Text>
        <Text style={styles.accountText}>{STRINGS.LOG_IN_TOACCOUNT}</Text>
        <View style={styles.accountView}>
          <Image style={styles.userStyle} source={IMAGES.USER} />
          {/* <CustomTextInput /> */}
          <CustomTextInput style={styles.texinputStyle} />
        </View>
      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 0.75,
    backgroundColor: COLORS.GREEN,
    borderBottomEndRadius: 190,

    borderBottomStartRadius: 190,
  },
  bottomContainer: {
    flex: 0.4,
    backgroundColor: COLORS.BLACK,
    borderBottomLeftRadius: 200,
  },
  helloText: {
    textAlign: 'center',
    marginTop: normalize(100),
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  accountText: {
    textAlign: 'center',
    color: COLORS.LIGHT_GREY,
    fontSize: 13,
  },

  accountView: {
    height: 70,
    width: normalize(100),
    borderRadius: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GREY,
    borderWidth: 1,
    flexDirection: 'row',
  },

  userStyle: {
    height: normalize(30),
    width: normalize(30),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  texinputStyle: {
    color: COLORS.GREEN,
  },
});
