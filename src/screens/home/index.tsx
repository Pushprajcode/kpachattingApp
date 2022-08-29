import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TopTabCategoryFn from '../../router/toptabnavigation';
import firestore from '@react-native-firebase/firestore';
import {IMAGES} from '../../utiles/images';
import {firebase} from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import Tooltip from 'react-native-walkthrough-tooltip';
import ROUTE_NAMES from '../../router/routeNames';
import {normalize} from '../../utiles/dimensions';
import Custombackbutton from '../../customComponents/custombackbutton';
TouchableHighlight;

export default function HomeScreen() {
  const [toolTipVisible, settoolTipVisible] = useState(true);
  const navigation = useNavigation<any>();
  const onpressSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('Signed Out');
        navigation.navigate(ROUTE_NAMES.LON_IN_SCREEN);
      })
      .catch(e => {
        console.error('Sign Out Error', e);
      });
  };
  return (
    <View style={styles.headerView}>
  
      {/* <View style={{flexDirection:'row',justifyContent:'space-between',paddingVertical:10}}> */}
      <Text style={styles.headingtxt}>{'KPA Chat'}</Text>
      {/* <Custombackbutton/> */}
      <TouchableOpacity onPress={onpressSignOut}>
        <Image style={styles.settingimg} source={IMAGES.SETTING_IMAGE} />
      </TouchableOpacity>

      <Tooltip
        isVisible={toolTipVisible}
        // placement={'right'}
        content={<Text style={{right: 50}}>Check this out!</Text>}
        onClose={() => {
          settoolTipVisible(false);
        }}>
        {/* <TouchableHighlight style={styles.touchable}> */}
        <TouchableOpacity>
          <Text>Press me</Text>
        </TouchableOpacity>

        {/* </TouchableHighlight> */}
      </Tooltip>
      {/* </View> */}

      <TopTabCategoryFn />
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#247881',
    flex: 1,
    paddingTop: 40,
  },
  
  headingtxt: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    left: 10,
    top: 10,
  },
  settingimg: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    bottom: 16,
    right: 10,
    tintColor: 'white',
  },
  touchable: {
    color: 'red',
  },
});
