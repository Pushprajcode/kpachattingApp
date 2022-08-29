import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { useDispatch } from 'react-redux';
import Custombackbutton from '../../customComponents/custombackbutton';

export default function Profile({route}: any) {
  const dispatch=useDispatch<any>()
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [time, settime] = useState(new Date().getTime());
  const reference = storage().ref(`img_${time}.jpg`);
  const navigation = useNavigation<any>();
  const [image, setimage] = useState('');
  const onpress = () => {
    // deleteStore();
    navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
  };
  <Custombackbutton style={styles.backButtonStyle}/>
  const imageUploadstore = (imagePath: any) => {
    console.log('reaches', imagePath);
    reference
      .putFile(imagePath)
      .then(res => {
        console.log('uploaded', res);
        reference.getDownloadURL().then(res=> {
          console.log('url====', res);
          dispatch({type:'sendurl',payload:res})
         
        })
      })
      .catch(err => {
        console.log('error upload', err);
      });
  };
  console.log('image', image);
  const imgPicker = () => {
    console.log('874894------>');
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
    })
      .then(img => {
        imageUploadstore(img.path);
        if (Platform.OS == 'ios') {
          setimage(img.sourceURL);
        } else {
          setimage(img.path);
        }
      })
      .catch(err => console.log(err));
  };
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
    backgroundColor:COLORS.WHITE
  },
  backButtonStyle:{
   backgroundColor:'red',
   alignSelf:'flex-end'

  },
  profileView: {
    borderTopLeftRadius: 200,
    borderBottomStartRadius: 200,
    height: normalize(222),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    textAlign: 'center',
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
