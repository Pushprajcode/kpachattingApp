import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import Custombackbutton from '../../customComponents/custombackbutton';
import firestore from '@react-native-firebase/firestore';

export default function Profile({route}: any) {
  const {name, phoneNoorEmail} = route.params;
  const dispatch = useDispatch<any>();
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [time, settime] = useState(new Date().getTime());
  const reference = storage().ref(`img_${time}.jpg`);
  const navigation = useNavigation<any>();
  const [image, setimage] = useState<any>('');
  const {loginUserId} = useSelector((store: any) => store.SignUpReducer);
  const onpress = () => {
    if (name != '' && phoneNoorEmail != '' && phone != '') {
      navigation.navigate(ROUTE_NAMES.HOME, {});
    }
  };
  <Custombackbutton style={styles.backButtonStyle} />;
  const imageUploadstore = (imagePath: any) => {
    reference
      .putFile(imagePath)
      .then(res => {
        reference.getDownloadURL().then(res => {
          firestore().collection('Users').doc(loginUserId).update({
            profileImage: res,
          });
        });
      })
      .catch(err => {
        console.log('error upload', err);
      });
  };
  console.log('image', image);
  const imgPicker = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
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

        <TouchableOpacity onPress={imgPicker} style={styles.imgpickerpress}>
          <Image style={styles.img} source={IMAGES.EDIT_PROFILE} />
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
          value={phoneNoorEmail}
        />
        <CustomTextInput
          placeholder={STRINGS.PHONE}
          style={styles.emailphonecommonStyle}
          value={phone}
          onChangeText={(text: any) => {
            setphone(text);
          }}
        />
        <CustomTextInput
          placeholder={STRINGS.Bio}
          style={styles.emailphonecommonStyle}
        />
        <CustomButton
          style={styles.buttonStyle}
          label={STRINGS.PROFILE_COMPLETED}
          onPress={onpress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backButtonStyle: {
    backgroundColor: 'red',
    alignSelf: 'flex-end',
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
    borderRadius: normalize(75),
    resizeMode: 'cover',
  },
  img: {height: 20, width: 20, tintColor: COLORS.LIGHT_BLUE},
  imgpickerpress: {
    backgroundColor: 'white',
    padding: 7,
    borderRadius: 50,
    top: 63,
    right: 45,
    borderColor: COLORS.LIGHT_BLUE,
    borderWidth: 1,
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
