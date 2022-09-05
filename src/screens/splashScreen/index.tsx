import {View, StyleSheet, Image, Animated, ImageBackground} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../utiles/dimensions';
import {IMAGES} from '../../utiles/images';
import COLORS from '../../utiles/colors';
import ROUTE_NAMES from '../../router/routeNames';
import {useSelector} from 'react-redux';

function SplashScreen() {
  const navigation = useNavigation<any>();

  const {loginUserId} = useSelector((store: any) => store.SignUpReducer);

  useEffect(() => {
    setTimeout(() => {
      if (loginUserId != '') {
        navigation.navigate(ROUTE_NAMES.HOME);
      } else navigation.replace(ROUTE_NAMES.LOG_IN_SCREEN);
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imagebackground}
        source={IMAGES.SPLASH_BACKGROUND}
      />
    </View>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagebackground: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  fadingContainer: {
    alignItems: 'center',
  },
  kpaView: {
    flexDirection: 'row',
    position: 'absolute',
  },
  kpaimage: {
    height: vh(250),
    width: vw(270),
    resizeMode: 'contain',
  },
});
