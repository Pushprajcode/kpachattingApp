import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import COLORS from '../../utiles/colors';
import STRINGS from '../../utiles/strings';
import {IMAGES} from '../../utiles/images';
import CustomButton from '../../customComponents/customButton';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import {normalize, vh, vw} from '../../utiles/dimensions';

export default function WellComeScreen() {
  const navigation = useNavigation<any>();
  const onpress = () => {
    navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
  };
  return (
    <View style={styles.containerView}>
      <Text style={styles.welcomeText}>{STRINGS.WELCOME_TEXT}</Text>
      <Image style={styles.whatsAppimgStyle} source={IMAGES.WHATSAPP_IMAGE} />
      <View style={styles.buttonView}>
        <Text style={styles.policyText}>
          {STRINGS.POLICY_TEXT}
          <Text style={styles.blueTextStyle}>
            {STRINGS.PRIVICY_TEXT}
            <Text style={styles.policyText}>
              {STRINGS.AGREE_CONTINUE}
              <Text style={styles.blueTextStyle}>{STRINGS.T_C}</Text>
            </Text>
          </Text>
        </Text>
      </View>
      <CustomButton
        onpress={onpress}
        label={STRINGS.WELCOME_BUTTON_TEXT}
        style={styles.buttonViewStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  welcomeText: {
    color: COLORS.WHITE,
    alignSelf: 'center',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    width: vw(300),
    height: vh(40),
    fontSize: normalize(25),
    marginTop: normalize(30),
  },
  whatsAppimgStyle: {
    resizeMode: 'contain',
    width: 300,
    height: 400,
    alignSelf: 'center',
  },
  policyText: {
    color: COLORS.WHITE,
    textAlign: 'center',
    lineHeight: 20,
  },

  buttonView: {
    flex: 0.7,
    justifyContent: 'flex-end',
  },
  blueTextStyle: {
    color: COLORS.LIGHT_BLUE,
  },
  buttonViewStyle: {
    backgroundColor: COLORS.LIGHT_GREEN,
  },
});
