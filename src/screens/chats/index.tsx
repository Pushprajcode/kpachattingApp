import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux'
import  firestore  from '@react-native-firebase/firestore';

export default function Chats() {

  const [messagesDetails, setmessagesDetails] = useState([]);
  const [messages, setMessages]= useState([])
  const {homeData} = useSelector(store=>store.SignUpReducer)
  console.log('fjnj',homeData);
  
 
   interface IMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean

  }

  useEffect(() => {
    setmessagesDetails([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])


  const onSend = useCallback((messagesDetails = []) => {
    setmessagesDetails(previousMessages => GiftedChat.append(previousMessages, messagesDetails))
    messages.push(messagesDetails[0].text)
    firestore().collection('Users').doc(homeData).set({
      messagesDetails,
      messages})
  }, [messagesDetails])


  return (
    <View style={styles.container}>
      <Text>
        {homeData}
      </Text>

{/* 
      <GiftedChat
            messages={messagesDetails}
            onSend={messages => onSend(messages)}
            user={{
              _id: 1,
            }}
      
            /> */}
            

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  }
})