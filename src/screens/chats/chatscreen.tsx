import {useSelector} from 'react-redux';
import COLORS from '../../utiles/colors';
import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Alert, StyleSheet, View, Text, Image} from 'react-native';
import Custombackbutton from '../../customComponents/custombackbutton';
import {GiftedChat, Bubble, InputToolbar, Send} from 'react-native-gifted-chat';
import {normalize} from '../../utiles/dimensions';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {IMAGES} from '../../utiles/images';

const Chat = ({route}: any) => {
  const {uid} = useSelector((store: any) => store.LoginReducer);
  const {Name, Uid, profileImage} = route.params;
  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const roomID = uid < Uid ? uid + Uid : Uid + uid;
  const [timer, setTimer] = useState(100);
  const [isTyping, setIsTyping] = useState(false);
  /**
   * @des userStatus
   */
  useEffect(() => {
    const updateStatus = firestore()
      .collection('Users')
      .doc(Uid)
      .onSnapshot((doc: any) => {
        let status = doc?.data()?.isActive;
        setUserStatus(status);
      });
    return () => updateStatus();
  }, []);

  /**
   * @des update messages
   */
  useEffect(() => {
    const updateMessages = firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('messages')
      .onSnapshot((doc: any) => {
        let data = doc?._docs?.map((element: any) => element?._data);
        data?.sort(
          (a: {createdAt: number}, b: {createdAt: number}) =>
            b.createdAt - a.createdAt,
        );
        setMessages(data);
      });
    return () => updateMessages();
  }, []);

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
      createdAt: new Date().getTime(),
    };

    setMessages(previousMsg => GiftedChat.append(previousMsg, mymessage));
    firestore()
      .collection('Chats')
      .doc(roomID)
      .collection('messages')
      .add(mymessage)
      .then()
      .catch((err: any) => console.log(err));
  };
  const CustomHeader = () => {
    console.log('fjefreriurituhtriuu89er', getStatusBarHeight());
    return (
      <View style={styles.backButtonView}>
        <Custombackbutton />

        <Image style={styles.profilepic} source={{uri: profileImage}} />
        <View style={styles.onlineView}>
          <Text style={styles.textName}>{Name}</Text>
          {userStatus ? (
            <Text style={styles.onlineText}>{'Online'}</Text>
          ) : (
            <Text style={styles.offlineText}>{'Ofline'}</Text>
          )}
        </View>
      </View>
    );
  };

  useEffect(() => {
    const typingListener = firestore()
      .collection('chats')
      .doc(roomID)
      .collection(Uid)
      .doc('CurrentTypingState')
      .onSnapshot(snapshot => {
        setIsTyping(snapshot?.data()?.isTyping);
      });

    return () => typingListener();
  }, []);

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
      .then(() => {
        console.log('Send success');
      })
      .catch(err => {
        console.log('SendError', err);
      });
  };

  return (
    <View style={styles.mainContainerStyle}>
      <CustomHeader />
      <View style={{flex: 1}}>
        <GiftedChat
        
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
                textStyle={{
                  right: {
                    color: COLORS.WHITE,
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: 'red',
                  },
                  right: {
                    backgroundColor: '#2b3595',
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
    flexDirection: 'row',
    marginTop: getStatusBarHeight(),
    backgroundColor: 'aqua',
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
    color: COLORS.RED,
    padding: 25,
  },
  onlineView: {
    flexDirection: 'row',
  },
  offlineText: {
    color: COLORS.BLACK,
    padding: 25,
  },
  textName: {
    color: COLORS.BLUE_MAGNETA,
    padding: 25,
  },
});
