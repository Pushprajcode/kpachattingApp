import {View, StyleSheet, Image, Animated, ImageBackground} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {vh, vw} from '../../utiles/dimensions';
import {IMAGES} from '../../utiles/images';
import COLORS from '../../utiles/colors';
import ROUTE_NAMES from '../../router/routeNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {store} from '../../redux/reducer/store';
import {useSelector} from 'react-redux';
//import LottieView from 'lottie-react-native';

function SplashScreen() {
  const navigation = useNavigation<any>();
  const {uid} = useSelector((store: any) => store.LoginReducer);
  console.log('---------SPLASHSCREEN--------->', uid);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [fadeAnim]);
  useEffect(()=>{
    setTimeout(() => {
      // const getData = async (user:any) => {
      //   try {
      //     const value = await AsyncStorage.getItem('emailvalue')
      //     if(value !== null) {
      //       console.log("user is fjycag",user)
      //      navigation.navigate(ROUTE_NAMES.PROFILE,{user})

      //     }
      //     else{
      //       navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN)
      //     }
      //   } catch(e) {

      //   }
      // }
    //   const value=AsyncStorage.getItem('user')
    //   console.log('value-me kya ayä',value)
    //   if(value!==null)
    //   {
    //     navigation.navigate(ROUTE_NAMES.PROFILE,{value})

    //   }
    //   else{
    //     navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN)

    //   }
        }, 3000);

  })
  useEffect(() => {
    if (uid){
     navigation.navigate(ROUTE_NAMES.HOME);
    }
    else navigation.replace(ROUTE_NAMES.LON_IN_SCREEN);
  });
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imagebackground}
        source={IMAGES.SPLASH_BACKGROUND}
      />

      <View style={styles.kpaView}>
        {/* <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Image style={styles.kpaimage} source={IMAGES.KPA_IMAGE} />
        </Animated.View> */}
        {/* <LottieView
        ref={animation => {
          animation = animation;
        }}
        source={require('/Users/admin/Desktop/React Native/kpaChatApp/src/lottie')}
      /> */}
      </View>
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
