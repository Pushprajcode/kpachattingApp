import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';
import CustomButton from '../../customComponents/customButton';
import STRINGS from '../../utiles/strings';
import {normalize} from '../../utiles/dimensions';
import COLORS from '../../utiles/colors';
import {useNavigation} from '@react-navigation/native';
import ROUTE_NAMES from '../../router/routeNames';
import {IMAGES} from '../../utiles/images';

export default function ProfilePopUp(props: any) {
  const {isModalVisible} = props;
  const navigation = useNavigation<any>();
  return (
    <Modal visible={isModalVisible} transparent={true}>
      <View style={styles.containerView}>
        <Image style={styles.likeImgStyle} source={IMAGES.LIKE_IMAGE} />
        <Text style={styles.textStyle}>{STRINGS.CONGRATULATION}</Text>
        <Text style={styles.succesfullText}>{STRINGS.SUCCESSFULLY}</Text>
        <CustomButton
          style={styles.buttonStyle}
          label={STRINGS.CONTINUE}
          labelExtraStyle={styles.labelExtraStyle}
          onPress={() => {
            navigation.navigate(ROUTE_NAMES.PROFILE);
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerView: {
    height: 270,
    width: 347,
    alignSelf: 'center',
    marginTop: 290,
    backgroundColor: COLORS.WHITE,
    borderTopColor: COLORS.PRIMARY_BLUE,
    borderTopWidth: 2,
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.PRIMARY_BLUE,
    borderLeftColor: COLORS.PRIMARY_BLUE,
    borderLeftWidth: 0.6,
    borderRightWidth: 0.6,
    borderRightColor: COLORS.PRIMARY_BLUE,
  },
  textStyle: {
    alignSelf: 'center',
    marginTop: normalize(20),
    fontSize: normalize(20),
    color: COLORS.LIGHT_BLACK,
    fontWeight: '900',
  },
  succesfullText: {
    alignSelf: 'center',
    lineHeight: normalize(50),
    color: COLORS.DARK_GREY,
  },
  buttonStyle: {
    marginTop: normalize(30),
    width: normalize(270),
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: normalize(5),
  },
  labelExtraStyle: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  likeImgStyle: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    marginTop: normalize(20),
  },
});
