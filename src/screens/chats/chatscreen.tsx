import {Alert, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
// import ActionType from '../../actions/actionType';
import {GiftedChat} from 'react-native-gifted-chat';
import {useDispatch, useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Chat = ({route}: any) => {
  const {uid} = useSelector((store: any) => store.LoginReducer);
  console.log('jouidusekrni hai', uid);

  const {Name, Uid} = route.params;
  console.log('uid', uid);

  console.log('first', Name, Uid);
  const [messages, setMessages] = useState([]);

  const roomID = uid < Uid ? uid + Uid : Uid + uid;
  /**
   * @
   */
  useEffect(() => {
    const updateMessage = firestore()
      .collection('Chats')
      .doc(roomID)
      .onSnapshot(documentSnapshot => {
        console.log('documentSnapshot', documentSnapshot);

        if (documentSnapshot.exists) {
          setMessages(documentSnapshot?.data()?.messsage);
        }
      });
    return () => updateMessage();
  }, []);

  /**
   *
   * @param message
   */
  const onSend = (message = []) => {
    // dispatch({type: ActionType.CHAT_DETAILS, payload: {chatDetails: messages}});
    //@ts-ignore
    message[0].createdAt = new Date().getTime();
    let newMessage = GiftedChat.append(messages, message);
    setMessages(newMessage);
    firestore()
      .collection('Chats')
      .doc(roomID)
      .set({
        messsage: newMessage,
        uid: uid,
      })
      .then(response => {
        console.log('first',response)
      })
      .catch(error => {});
  };

  return (
    <GiftedChat
      scrollToBottomStyle={{borderStartColor: 'red', backgroundColor: 'white'}}
      isTyping={true}
      scrollToBottom
      messagesContainerStyle={{backgroundColor: 'yellow'}}
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
    />
  );
};

export default React.memo(Chat);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
