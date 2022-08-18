import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import STRINGS from '../../utiles/strings';
import COLORS from '../../utiles/colors';
import {normalize} from '../../utiles/dimensions';
import {IMAGES} from '../../utiles/images';
import CustomTextInput from '../../customComponents/customTextInput';
import storage from '@react-native-firebase/storage';
import CustomButton from '../../customComponents/customButton';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import ImageCropPicker from 'react-native-image-crop-picker';


export default function Profile({route}: any) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [time, settime] = useState(new Date().getTime());
  // console.log('routes',route)
  // console.log('_______________',route.params.user._user.uid)
  // const id = route.params.user._user.uid;
  const navigation = useNavigation<any>();
  const [image, setimage] = useState('');
  const onpress = () => {
    // deleteStore();
    navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
  };
  console.log('image', image);
  const imgPicker = () => {
    // console.log('874894------>')
    // ImageCropPicker.openPicker({
    //   size: 1000,
    //   width: 300,
    //   height: 400,
    //   mime: 'image/png',
    //   cropping: true,
    // })
    ImageCropPicker.openPicker({
      width:300,
      height:400
    })
    .then(img => {
      console.log("resolved")
        // settime(new Date().getTime());

        // const reference = storage().ref(`img_${time}.jpg`);
        // console.log('ref = ', reference);
        // reference &&
        //   reference
        //     .putFile(img.path)
        //     .then(res => console.log('putfile = ', res));
         setimage(img.path);
      })
      .catch(err => console.log(err))
      // .catch(error => {
      //   console.log('err', error);
      // });
  };
  // useEffect(() => {
  //   firestore()
  //     .collection('users')
  //     .doc(id)
  //     .get()
  //     .then((res: any) => {
  //       console.log('emailu32u4', res);
  //       setEmail(res._data.email);
  //       setName(res._data.name);
  //     });
  // });

  return (
    <View style={styles.containerView}>
      <Text style={styles.profileText}>{STRINGS.PROFILE}</Text>
      <View style={styles.profileView}>
        {image != '' ? (
          <TouchableOpacity>
            <Image style={styles.profileImge} source={{uri: image}} />
          </TouchableOpacity>
        ) : (
          <Image style={styles.userImgStyle} source={IMAGES.USER} />
        )}

        <TouchableOpacity
          onPress={imgPicker}
          style={{
            backgroundColor: 'white',
            padding: 7,
            borderRadius: 50,
            top: 63,
            right: 40,
          }}>
          <Image
            style={{height: 20, width: 20, tintColor: COLORS.LIGHT_BLUE}}
            source={IMAGES.EDIT_PROFILE}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.textinputView}>
        <CustomTextInput
          value={name}
          placeholder={STRINGS.NAME}
          style={styles.emailphonecommonStyle}
        />
        <CustomTextInput
          placeholder={STRINGS.EMAIL_NUMBER}
          style={styles.emailphonecommonStyle}
          value={email}
        />
        <CustomTextInput
          placeholder={STRINGS.PHONE}
          style={styles.emailphonecommonStyle}
        />
        <CustomTextInput
          placeholder={STRINGS.Bio}
          style={styles.emailphonecommonStyle}
        />
        <CustomButton
          style={styles.buttonStyle}
          label={STRINGS.LOGOUT}
          onPress={onpress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    // backgroundColor: COLORS.LIGHT_BLUE,
    backgroundColor: COLORS.WHITE,
  },
  profileView: {
    // backgroundColor: COLORS.LIGHT_BLUE,
    borderTopLeftRadius: 200,
    borderBottomStartRadius: 200,
    //  borderTopRightRadius: 280,
    height: normalize(222),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    textAlign: 'center',
    //marginTop: normalize(50),
    fontSize: normalize(20),
    color: COLORS.LIGHT_BLUE,
  },
  profileImge: {
    height: normalize(150),
    width: normalize(150),
    alignSelf: 'center',
    borderRadius: normalize(200),
    resizeMode: 'contain',
  },
  editStyle: {
    height: normalize(20),
    width: normalize(20),
    position: 'absolute',
    top: normalize(35),
    right: normalize(9),
  },
  textinputView: {
    paddingLeft: normalize(24),
    marginTop: normalize(50),
    backgroundColor: COLORS.WHITE,
  },
  emailphonecommonStyle: {
    marginTop: normalize(20),
    paddingLeft: 12,
  },
  buttonStyle: {
    width: normalize(328),
    marginRight: normalize(23),
    marginTop: normalize(30),
  },
  userImgStyle: {
    height: normalize(150),
    width: normalize(150),
    alignSelf: 'center',
    borderRadius: normalize(200),
    resizeMode: 'contain',
  },
});
