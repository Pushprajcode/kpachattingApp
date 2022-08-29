import {useSelector} from 'react-redux';
import COLORS from '../../utiles/colors';
import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Alert, Image, StyleSheet, View, Text} from 'react-native';
import Custombackbutton from '../../customComponents/custombackbutton';
import {GiftedChat, Bubble, InputToolbar} from 'react-native-gifted-chat';

const Chat = ({route}: any) => {
  const {uid} = useSelector((store: any) => store.LoginReducer);
  const {Name, Uid, status} = route.params;
  const [messages, setMessages] = useState([]);
  const [userStatus, setUserStatus] = useState(false);
  const roomID = uid < Uid ? uid + Uid : Uid + uid;

/**
 * @des userStatus
 */
  useEffect(()=>{
    const updateStatus = firestore()
    .collection('Users')
    .doc(Uid)
    .onSnapshot((doc: any) => {
      let status = doc?.data()?.isActive;
      setUserStatus(status)
      console.log('whatgjj is stateus',status)

      // setMessages(data1);
    });
  return () => updateStatus();},[])
/**
 * @des update messages
 */
  useEffect(() => {
  const updateMessages =  firestore()
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
      return ()=>updateMessages()
  }, []);

  /**
   *
   * @param message
   */
  const onSend = (message: any) => {
    // dispatch({type: ActionType.CHAT_DETAILS, payload: {chatDetails: messages}});

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

  return (
    <View style={styles.mainContainerStyle}>
      {/* <TouchableOpacity>
        <Image
        source={IMAGES.BACK_IMAGE}
        style={{height:20,width:20,resizeMode:'contain'}}
        />
      </TouchableOpacity> */}
      <Custombackbutton />
      {/* <Text>Current state is: {appStateVisible}</Text> */}
      <Text>{Name}</Text>

      {userStatus ? (
        <Text style={{color: 'red', marginLeft: 85}}>{'Online'}</Text>
      ) : (
        <Text style={{color: 'black', marginLeft: 85}}>{'Ofline'}</Text>
      )}
      <GiftedChat
        scrollToBottomStyle={{
          borderStartColor: 'red',
          backgroundColor: 'white',
        }}
        isTyping={true}
        scrollToBottom
        messagesContainerStyle={{backgroundColor: COLORS.WHITE}}
        onPress={() => {
          Alert.alert('Bubble pressed');
        }}
        // showUserAvatar={true}
        messages={messages}
        onSend={message => onSend(message)}
        user={{
          _id: uid,
          // avatar: profileImage,
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: COLORS.BLACK,
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: 'red',
                },
                right: {
                  backgroundColor: '#e0d5ff',
                },
              }}
            />
          );
        }}
        renderInputToolbar={props => {
          return <InputToolbar {...props} containerStyle={styles.toolbar} />;
        }}
      />
    </View>
  );
};

export default React.memo(Chat);

const styles = StyleSheet.create({
  mainContainerStyle: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolbar: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: '#eaeeef',
    borderTopColor: COLORS.DARK_GREY,
  },
});
