import {useSelector} from 'react-redux';
import COLORS from '../../utiles/colors';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Time,
} from 'react-native-gifted-chat';
import {normalize, vh, vw} from '../../utiles/dimensions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {IMAGES} from '../../utiles/images';
import Chats from '.';
import {useNavigation} from '@react-navigation/native';

const Chat = ({route}: any) => {
  console.log(route.params);
  const navigation = useNavigation();
  const {loginUserId} = useSelector((store: any) => store.SignUpReducer);
  const uid = loginUserId;
  const {Name, Uid, profileImage} = route?.params;

  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const roomID = uid < Uid ? uid + Uid : Uid + uid;
  const [timer, setTimer] = useState(100);
  const [isTyping, setIsTyping] = useState(false);
  const [loginData, SetloginData] = useState<any>();
  /**
   * @des userStatus
   */
  // useEffect(() => {
  //   firestore()
  //     .collection('Users')
  //     .doc(uid)
  //     .onSnapshot(onchange => {
  //       const userData = onchange.data();
  //       SetloginData(userData);
  //     });
  //   const updateStatus = firestore()
  //     .collection('Users')
  //     .doc(Uid)
  //     .onSnapshot((doc: any) => {
  //       let status = doc?.data()?.isActive;
  //       setUserStatus(status);
  //     });
  //   return () => updateStatus();
  // }, []);

  // /**
  //  * @des update messages
  //  */
  // useEffect(() => {
  //   const updateMessages = firestore()
  //     .collection('Chats')
  //     .doc(roomID)
  //     .collection('messages')
  //     .onSnapshot((doc: any) => {
  //       let data = doc?._docs?.map((element: any) => element?._data);
  //       data?.sort(
  //         (a: {createdAt: number}, b: {createdAt: number}) =>
  //           b.createdAt - a.createdAt,
  //       );

  //       let newmsgs = data.filter((item: any) => {
  //         if (item?.deletedForEveryOne) {
  //           return false;
  //         } else if (item?.deletedBy) {
  //           return item?.deletedBy != uid;
  //         } else {
  //           return true;
  //         }
  //       });

  //       setMessages(newmsgs);
  //     });
  //   return () => updateMessages();
  // }, []);

  /**
   *
   * @param message
   */
  const onSend = (message: any) => {
    const mesg = message[0];
    const mymessage = {
      ...mesg,
      sendTo: Uid,
      sendBy: uid,
      sent: true,
      received: false,
      createdAt: new Date().getTime(),
    };
    console.log(message.length);
    if (message.length < 2) {
      firestore()
        .collection('Users')
        .doc(uid)
        .collection('Inbox')
        .doc(Uid)
        .set({
          Name: Name,
          id: Uid,
          lastMessage: mymessage,
          profileImage: profileImage,
        });

      firestore()
        .collection('Users')
        .doc(Uid)
        .collection('Inbox')
        .doc(uid)
        .set({loginData, lastmessage: mymessage});
    }

    setMessages(previousMsg => GiftedChat.append(previousMsg, mymessage));
    firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('messages')
      .doc(mymessage._id)
      .set({...mymessage});
  };

  // useEffect(() => {
  //   hanleReadStatus();
  // }, []);

  // const hanleReadStatus = async () => {
  //   const validate = await firestore()
  //     .collection('Chats')
  //     .doc(roomID)
  //     .collection('messages')
  //     .get();
  //   const batch = firestore()?.batch();
  //   validate.forEach((documentSnapshot: any) => {
  //     if (documentSnapshot._data.sendTo === uid) {
  //       batch.update(documentSnapshot.ref, {received: true});
  //     }
  //   });
  //   return batch.commit();
  // };

  // useEffect(() => {
  //   const typingListener = firestore()
  //     .collection('chats')
  //     .doc(roomID)
  //     .collection(Uid)
  //     .doc('CurrentTypingState')
  //     .onSnapshot(snapshot => {
  //       setIsTyping(snapshot?.data()?.isTyping);
  //     });

  //   return () => typingListener();
  // }, []);

  const _onInputTextChanged = (text: any) => {
    if (text.length > 0) {
      typingStatus(true);
      clearTimeout(timer);

      const newTimer = setTimeout(() => {
        typingStatus(false);
      }, 1000);

      setTimer(newTimer);
    }
  };

  const typingStatus = (bool: boolean) => {
    firestore()
      .collection('chats')
      .doc(roomID)
      .collection(uid)

      .doc('CurrentTypingState')
      .set({
        isTyping: bool,
      })
      .then(() => {})
      .catch(err => {
        console.log('SendError', err);
      });
  };

  const handleLongPress = useCallback(
    (context, message) => {
      let options, cancelButtonIndex;
      if (uid === message.sendBy) {
        options = ['copy', 'Delete Me', 'Delete for EveryOne', 'Cancel'];
        cancelButtonIndex = options.length;
        context
          .actionSheet()
          .showActionSheetWithOptions(
            {options, cancelButtonIndex},
            (buttonIndex: any) => {
              switch (buttonIndex) {
                case 0:
                  Clipboard.setString(message.text);
                  break;
                case 1:
                  deletForMe(message, roomID, uid, Uid);
                  break;
                case 2:
                  deletedForEveryOne(message, roomID, Uid, uid);
                  break;
              }
            },
          );
      } else {
        options = ['copy', 'Delete Me', 'Cancel'];
        cancelButtonIndex = options.length;
        context
          .actionSheet()
          .showActionSheetWithOptions(
            {options, cancelButtonIndex},
            (buttonIndex: any) => {
              switch (buttonIndex) {
                case 0:
                  Clipboard.setString(message.text);
                  break;
                case 1:
                  deletForMe(message, roomID, uid, Uid);
                  break;
              }
            },
          );
      }
    },
    [messages],
  );

  const deletForMe = (
    message: string,
    roomID: string,
    uid: string,
    Uid: string,
  ) => {
    firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('messages')
      .doc(message?._id)
      .update({...message, deletedBy: uid});
  };
  const deletedForEveryOne = (
    message: string,
    roomID: string,
    uid: string,
    Uid: string,
  ) => {
    firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('messages')
      .doc(message?._id)
      .update({...message, deletedForEveryOne: true});
  };

  return (
    <View style={styles.mainContainerStyle}>
      <View style={styles.headerContainerView}>
        <TouchableOpacity
          style={styles.backButtonView}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={IMAGES.ARROW_IMAGE} style={styles.backButtonStyle} />
        </TouchableOpacity>
        <View style={styles.userImageStyle}>
          <Image style={styles.backButtonStyle} source={{uri: profileImage}} />
        </View>
        <View style={styles.userInfoView}>
          <Text style={styles.nameTextStyle}>{Name}</Text>
          {userStatus ? (
            <Text style={styles.onlineText}>{'Online'}</Text>
          ) : (
            <Text style={styles.offlineText}>{'Ofline'}</Text>
          )}
        </View>
        <View style={styles.videoStyleView}>
          <TouchableOpacity>
            <Image style={styles.videoStyle} source={IMAGES.VEDIO_IMAGE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.phoneStyle} source={IMAGES.PHONE_IMAGE} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={styles.lineStyle} source={IMAGES.LINES_IMAGE} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}>
        <GiftedChat
          onLongPress={handleLongPress}
          onInputTextChanged={_onInputTextChanged}
          scrollToBottomStyle={{
            borderStartColor: COLORS.RED,
            backgroundColor: COLORS.WHITE,
          }}
          isTyping={isTyping}
          scrollToBottom
          messagesContainerStyle={{backgroundColor: COLORS.WHITE}}
          onPress={() => {
            Alert.alert('Bubble pressed');
          }}
          messages={messages}
          onSend={message => onSend(message)}
          user={{
            _id: uid,
          }}
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                tickStyle={{color: COLORS.RED}}
                textStyle={{
                  right: {
                    color: COLORS.WHITE,
                  },
                  left: {
                    color: COLORS.WHITE,
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#2eccdb',
                    right: normalize(45),
                  },
                  right: {
                    backgroundColor: '#28a9c8',
                  },
                }}
              />
            );
          }}
          renderInputToolbar={props => {
            return <InputToolbar {...props} containerStyle={styles.toolbar} />;
          }}
          renderSend={props => {
            return (
              <Send {...props}>
                <Image
                  style={{transform: [{rotate: '180deg'}]}}
                  source={IMAGES.BACK_IMAGE}
                />
              </Send>
            );
          }}
          renderTime={props => {
            return (
              <Time
                {...props}
                timeTextStyle={{
                  left: {
                    color: 'white',
                    fontSize: normalize(13),
                  },
                  right: {
                    color: 'white',
                    fontSize: normalize(13),
                  },
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export default React.memo(Chat);

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  backButtonView: {
    height: normalize(40),
    width: normalize(30),
  },
  profilepic: {
    height: 50,
    width: 50,
    borderRadius: 50,
    right: normalize(115),
    marginTop: 10,
  },

  toolbar: {
    backgroundColor: '#eaeeef',
    borderRadius: normalize(10),
    marginHorizontal: normalize(10),
    borderBottomWidth: normalize(1),
  },
  onlineText: {
    color: COLORS.WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  onlineView: {
    flexDirection: 'row',
    width: '50%',
    backgroundColor: 'red',
  },
  offlineText: {
    color: COLORS.BLACK,
    fontSize: 15,
    fontWeight: '700',
  },
  textName: {
    color: COLORS.BLUE_MAGNETA,
    padding: 25,
  },
  headerContainerView: {
    height: normalize(80),
    backgroundColor: '#28a9c8',
    marginTop: getStatusBarHeight(),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: normalize(10),
  },
  backButtonStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    right: normalize(3),
  },
  userImageStyle: {
    height: normalize(50),
    width: normalize(50),
    borderRadius: normalize(30),
    backgroundColor: COLORS.GREY,
    marginLeft: normalize(5),
    overflow: 'hidden',
  },
  userInfoView: {
    height: normalize(50),
    width: '50%',
    padding: normalize(5),
  },

  nameTextStyle: {
    fontSize: normalize(18),
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  videoStyle: {
    height: vh(28),
    width: vw(28),
    marginTop: normalize(3),
    resizeMode: 'contain',
  },
  lineStyle: {
    height: vh(20),
    width: vw(20),
    transform: [{rotate: '90deg'}],
    marginTop: normalize(6),
    resizeMode: 'contain',
    marginLeft: normalize(5),
  },
  videoStyleView: {
    flexDirection: 'row',
    right: normalize(10),
    marginBottom: normalize(10),
    marginLeft: normalize(10),
  },
  phoneStyle: {
    height: vh(30),
    width: vw(30),
    marginTop: normalize(3),
    marginLeft: 10,
    resizeMode: 'contain',
  },
});
