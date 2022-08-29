import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import CustomTextInput from '../../customComponents/customTextInput';
import STRINGS from '../../utiles/strings';
import COLORS from '../../utiles/colors';
import {IMAGES} from '../../utiles/images';
import {normalize, vh, vw} from '../../utiles/dimensions';
import {
  handleValidPhoneNo,
  handleValidEmail,
  handlePassword,
  handleConfirmPassword,
  handleNameValidation,
} from '../../utiles/validation';
import CustomButton from '../../customComponents/customButton';
import {useNavigation} from '@react-navigation/native';
// import {createUser} from '../../utiles/commonfunction';
// import ROUTE_NAMES from '../../router/routeNames';
// import {storeData} from '../../utiles/asynStorage';
// import {submitUserData} from '../../utiles/commonfunction';
// import {updateStore} from '../../utiles/commonfunction';
// import {deleteStore} from '../../utiles/commonfunction';
import EyeButton from '../../customComponents/eyeButton';
import ProfilePopUp from '../profilePop_Up';
import auth from '@react-native-firebase/auth';
import ROUTE_NAMES from '../../router/routeNames';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
export default function SignUp() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [phoneNoorEmail, setPhoneNoorEmail] = React.useState('');
  const [phoneNoorEmailError, setphoneNoorEmailError] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const onpressSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(phoneNoorEmail, password)
      .then(res => {
        let uid = res.user._user.uid;
        console.log('AgterSignUp UID__________________',uid);
        firestore()
          .collection('Users')
          .doc(uid)
          .set({name: name, email: phoneNoorEmail, uid: uid,isActive:false})
          .then(res => {
            console.log(res);
          })
          .catch(err => console.log(err));
        // .add({
        //   uid
        // })

        dispatch({type: 'uid', payload: uid});
      })
      .catch(err => {
        console.log('Error UserCreate', phoneNoorEmail, password, err);
      });

    // // submitUserData(phoneNoorEmail, password, name);
    // // updateStore(phoneNoorEmail, password);
    // // deleteStore();
    // // navigation.navigate(ROUTE_NAMES.PROFILE)

    // // Keyboard.dismiss();
    // if (
    //   name != '' &&
    //   phoneNoorEmail == '' &&
    //   passwordError == '' &&
    //   confirmPasswordError == ''
    // ) {
    //   navigation.navigate(ROUTE_NAMES.PROFILE);
    // }
    //navigation.navigate(ROUTE_NAMES.PROFILE)
    //  <ProfilePopUp/>

    // setModalVisible(!isModalVisible)
    // navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN)
    navigation.navigate(ROUTE_NAMES.PROFILE);
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
  const onchangeConfirmPassword = (value: any) => {
    setConfirmPassword(value);
    handleConfirmPassword(value, password, (message: any) => {
      setConfirmPasswordError(message);
    });
  };
  const handlename = (text: any) => {
    setName(text);
    handleNameValidation(text, (callback: any) => {
      setErrorName(callback);
    });
  };
  return (
    <ScrollView>
      <View style={styles.containerView}>
        {isModalVisible && <ProfilePopUp isModalVisible={isModalVisible} />}
        <Image style={styles.imgbackStyle} source={IMAGES.BACKGROUND_IMAGE} />
        <Text style={styles.signUp}>{STRINGS.CREATE_ACCOUNT}</Text>
        <View style={styles.textinputView}>
          <CustomTextInput
            style={styles.nameStyle}
            placeholder={STRINGS.NAME}
            value={name}
            onChangeText={handlename}
          />
          <Text style={styles.validErrornameStyle}>
            {errorName ? errorName : null}
          </Text>
          <CustomTextInput
            placeholder={STRINGS.EMAIL_NUMBER}
            value={phoneNoorEmail}
            onChangeText={onChangeTextPhoneorEmail}
            style={styles.emailTextStyle}
          />
          <Text style={styles.validErrorStyle}>
            {phoneNoorEmailError ? phoneNoorEmailError : null}
          </Text>
          <CustomTextInput
            placeholder={STRINGS.PASSWORD}
            onChangeText={onchangePass}
            value={password}
            secureTextEntry={showPassword}
            style={styles.passwordStyle}
          />
          <EyeButton style={styles.passwordButton} />
          <Text style={styles.validErrorStyle}>
            {passwordError ? passwordError : null}
          </Text>
          <CustomTextInput
            value={confirmPassword}
            placeholder={STRINGS.CONFIRM_PASSWORD}
            onChangeText={onchangeConfirmPassword}
            secureTextEntry={onchangeConfirmPassword}
            style={styles.passwordStyle}
          />
          <Text style={styles.validErrorStyle}>
            {confirmPasswordError ? confirmPasswordError : null}
          </Text>
          <EyeButton style={styles.eyeButton} />
        </View>
        <CustomButton
          onPress={onpressSignUp}
          style={styles.buttonStyle}
          label={STRINGS.SIGN_UP}
        />
        {/* <View style={styles.userView}>
          <Text>{STRINGS.NEW_USER}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
            }}>
            <Text style={styles.signStyle}>{STRINGS.SIGIN}</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    borderColor: COLORS.WHITE,
  },
  imgbackStyle: {
    height: normalize(300),
    width: normalize(400),
    borderBottomLeftRadius: 300,
  },
  signUp: {
    fontWeight: 'bold',
    marginTop: vh(40),
    color: COLORS.WHITE,
    fontSize: normalize(32),
    position: 'absolute',
    alignSelf: 'center',
  },
  textinputView: {
    marginTop: normalize(40),
    marginHorizontal: normalize(24),
  },
  validErrornameStyle: {
    marginBottom: normalize(0),
    color: COLORS.RED,
    marginLeft: normalize(5),
  },
  validErrorStyle: {
    color: COLORS.RED,
    fontSize: 12,
    left: 5,
    marginVertical: 7,
  },

  emailTextStyle: {
    paddingHorizontal: vw(15),
    marginTop: normalize(5),
  },
  eyeButton: {
    marginTop: normalize(217),
    resizeMode: 'contain',
  },
  passwordButton: {
    marginTop: normalize(142),
  },
  buttonStyle: {
    marginTop: normalize(20),
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: COLORS.WHITE,
  },
  passwordStyle: {
    marginBottom: 0,
    paddingHorizontal: vw(15),
    paddingRight: normalize(35),
  },
  userView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: normalize(25),
  },
  signStyle: {
    color: COLORS.LIGHT_BLUE,
    marginLeft: 10,
  },
  nameStyle: {
    paddingHorizontal: vw(15),
    marginBottom: normalize(7),
  },
});
