import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import COLORS from '../../utiles/colors';
import STRINGS from '../../utiles/strings';
import CustomTextInput from '../../customComponents/customTextInput';
import {handlePassword} from '../../utiles/validation';
import {normalize, vh, vw} from '../../utiles/dimensions';
import {IMAGES} from '../../utiles/images';
import CustomButton from '../../customComponents/customButton';

export default function VerifyNoEmail() {
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const onchangePass = (value: any) => {
    setPassword(value);
    handlePassword(value, (message: any) => {
      setPasswordError(message);
    });
  };
  const toastfun = () => {
    ToastAndroid.show(STRINGS.PASSWORD_EMPTY, ToastAndroid.CENTER);
  };
  const onpress = () => {
    if (password == '') {
      toastfun();
    }
  };
  return (
    <View style={styles.containerView}>
      <Text style={styles.verifyText}>{STRINGS.VERIFYNO_EMAIL}</Text>
      <CustomTextInput
        value={password}
        placeholder={STRINGS.PASSWORD}
        style={styles.textInputStyle}
        onChangeText={onchangePass}
        secureTextEntry={showPassword}
      />
      <Text style={styles.validErrorStyle}>
        {passwordError ? passwordError : null}
      </Text>
      <TouchableOpacity
        style={styles.eyeView}
        onPress={() => {
          setShowPassword(!showPassword);
        }}>
        {showPassword ? (
          <Image style={styles.eyeClose} source={IMAGES.EYE_CLOSE} />
        ) : (
          <Image style={styles.eyeOpen} source={IMAGES.EYE_OPEN} />
        )}
      </TouchableOpacity>
      <CustomButton
        label={STRINGS.SUBMIT}
        style={styles.buttonStyle}
        onpress={onpress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  verifyText: {
    color: COLORS.WHITE,
    alignSelf: 'center',
    fontSize:20,
  },
  textInputStyle: {
    alignSelf: 'center',
  },
  validErrorStyle: {
    color: COLORS.RED,
    alignSelf: 'center',
    marginTop: normalize(5),
  },
  eyeView: {
    height: normalize(20),
    width: normalize(20),
    alignSelf: 'flex-end',
    right: normalize(90),
    top: normalize(42),
    position: 'absolute',
  },
  eyeClose: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  eyeOpen: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    tintColor:COLORS.LIGHT_GREEN
  },
  buttonStyle: {
    height: vh(48),
    width: vw(120),
   marginTop:normalize(30)
  },
});
