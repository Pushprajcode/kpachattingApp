import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {normalize, vw} from '../../utiles/dimensions';
import STRINGS from '../../utiles/strings';
import COLORS from '../../utiles/colors';
import {IMAGES} from '../../utiles/images';
import CustomTextInput from '../../customComponents/customTextInput';
import {
  handleValidPhoneNo,
  handleValidEmail,
  handlePassword,
} from '../../utiles/validation';
import CustomButton from '../../customComponents/customButton';
import ROUTE_NAMES from '../../router/routeNames';
import {storeData} from '../../utiles/asynStorage';
import EyeButton from '../../customComponents/eyeButton';
import auth from '@react-native-firebase/auth'
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const [phoneNoorEmail, setPhoneNoorEmail] = React.useState('');
  const [phoneNoorEmailError, setphoneNoorEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch()
  const onpressRegister = () => {
    navigation.navigate(ROUTE_NAMES.SIGN_Up);
  };

  const toastfun = () => {
    ToastAndroid.show(STRINGS.EMAIL_NUMBER, ToastAndroid.CENTER);
  };
  const onpress = () => {
    auth()
    .signInWithEmailAndPassword(phoneNoorEmail,password)
    .then((resp) => {
      console.log('fgvfd',resp);
      
      let uid=resp.user._user.uid;
      console.log('first,uid',uid)
      console.log('User account created & signed in!',uid);
      navigation.navigate(ROUTE_NAMES.HOME, {uid})
      dispatch({type:'uid', payload:uid})
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
    // if (phoneNoorEmail == '' && password == '') {
    //   toastfun();
    // } else {
    //   emailPasswordAuth(phoneNoorEmail, password);
    //   storeData(phoneNoorEmail);
    // }
  };
  const onChangeTextPhoneorEmail = (value: any) => {
    if (isFinite(value) == true) {
      setPhoneNoorEmail(value);
      handleValidPhoneNo(value, (message: any) => {
        setphoneNoorEmailError(message);
      });
    }
    if (isFinite(value) == false) {
      setPhoneNoorEmail(value);
      handleValidEmail(value, (message: any) => {
        setphoneNoorEmailError(message);
      });
    }
  };
  const onchangePass = (value: any) => {
    setPassword(value);
    handlePassword(value, (message: any) => {
      setPasswordError(message);
    });
  };
  return (
    <View style={styles.containerView}>
      <Image style={styles.imageback} source={IMAGES.BACKGROUND_IMAGE} />
      <Text style={styles.phoneText}>{STRINGS.HELLO_AGAIN}</Text>

      <View style={styles.textInputView}>
        <CustomTextInput
          placeholder={STRINGS.EMAIL_NUMBER}
          value={phoneNoorEmail}
          onChangeText={onChangeTextPhoneorEmail}
          style={styles.emailTextStyle}
        />

        <Text style={styles.validErrorStyle}>
          {phoneNoorEmailError ? phoneNoorEmailError : null}
        </Text>
        <View>
          <EyeButton />
          <CustomTextInput
            value={password}
            placeholder={STRINGS.PASSWORD}
            onChangeText={onchangePass}
            secureTextEntry={showPassword}
            style={styles.emailTextStyle}
          />
        </View>
        <Text style={styles.validErrorStyle}>
          {passwordError ? passwordError : null}
        </Text>
        <TouchableOpacity onPress={()=>{
          navigation.navigate(ROUTE_NAMES.PROFILE);

        }}>
          <Text style={styles.fogetText}>{STRINGS.FORGET_PASSWORD}</Text>
        </TouchableOpacity>
      </View>

      <CustomButton
        label={STRINGS.SIGIN}
        style={styles.buttonStyle}
        onPress={onpress}
      />

      <View style={styles.registerView}>
        <Text>{STRINGS.NOT_MEMBER}</Text>
        <TouchableOpacity onPress={onpressRegister}>
          <Text style={styles.registerText}>{STRINGS.REGISTER}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    borderColor: COLORS.WHITE,
    backgroundColor: COLORS.WHITE,
  },
  phoneText: {
    fontSize: normalize(24),
    fontWeight: '900',
    position: 'absolute',
    textAlign: 'center',
    alignSelf: 'center',
    color: COLORS.WHITE,
    marginTop: normalize(80),
  },

  textInputView: {
    marginTop: normalize(40),
    marginHorizontal: normalize(24),
  },
  emailTextStyle: {
    borderRadius: 5,
    paddingHorizontal: vw(10),
    marginTop: 10,
  },
  validErrorStyle: {
    color: COLORS.RED,
    fontSize: 12,
    left: 5,
    marginTop: 5,
  },
  imageback: {
    height: 300,
    width: '100%',
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 100,
  },
  eyeView: {
    height: normalize(20),
    width: normalize(20),
    position: 'absolute',
    top: normalize(97),
    right: normalize(10),
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
  fogetText: {
    alignSelf: 'flex-end',
    color: COLORS.LIGHT_BLUE,
  },

  buttonStyle: {
    marginTop: normalize(20),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.WHITE,
  },
  orView: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orText: {
    marginHorizontal: 6,
  },
  orStart: {
    height: 1,
    width: 100,
    backgroundColor: COLORS.LIGHT_GREY,
    marginTop: 3,
  },
  orEnd: {
    height: 1,
    width: 100,
    backgroundColor: COLORS.LIGHT_GREY,
    marginTop: 3,
  },
  registerView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: normalize(30),
  },
  registerText: {
    color: COLORS.LIGHT_BLUE,
    marginLeft: 5,
  },
});
function dispatch(arg0: { ty: any; }) {
  throw new Error('Function not implemented.');
}

