// // import { StyleSheet, Text, View } from 'react-native'
// // import React from 'react'

// // export default function Chatscreen() {
// //   return (
// //     <View>
// //       {/* <Text>chatscreen</Text> */}

// //     </View>
// //   )
// // }

// // const styles = StyleSheet.create({})
// import { StyleSheet, Text, View } from 'react-native'
// import React, { useCallback, useEffect, useState } from 'react'
// import { GiftedChat } from 'react-native-gifted-chat';
// import { useSelector } from 'react-redux'
// import  firestore  from '@react-native-firebase/firestore';


// export default function ChatScreen() {

//   const [messagesDetails, setmessagesDetails] = useState([]);
//   const [messages, setMessages]= useState([])
//   // const {homeData} = useSelector(store=>store.SignUpReducer)
//   // console.log('fjnj',homeData);

 
//    interface IMessage {
//     _id: string | number
//     text: string
//     createdAt: Date | number
    
//     image?: string
//     video?: string
//     audio?: string
//     system?: boolean
//     sent?: boolean
//     received?: boolean
//     pending?: boolean

//   }

//   useEffect(() => {
//     setmessagesDetails([
//       {
//         _id: 1,
//         text: 'Hello developer',
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: 'React Native',
//           avatar: 'https://placeimg.com/140/140/any',
//         },
//       },
//     ])
//   }, [])


//   const onSend = useCallback((messagesDetails = []) => {
//     setmessagesDetails(previousMessages => GiftedChat.append(previousMessages, messagesDetails))
//     messages.push(messagesDetails[0].text)
//     firestore().collection('Users').doc(homeData).set({
//       messagesDetails,
//       messages})
//   }, [messagesDetails])


//   return (
//     <View style={styles.container}>
//       {/* <Text>
//         {homeData}
//       </Text> */}

// {/* 
//       <GiftedChat
//             messages={messagesDetails}
//             onSend={messages => onSend(messages)}
//             user={{
//               _id: 1,
//             }}
      
//             /> */}
            

//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container:{
//     flex:1,
    
//   }
// })
import React, { useState, useCallback, useEffect } from 'react'
import { Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';

export  default function ChatScreen({route}:any) {
  // console.log('487347438435',route)
  const {uid}=useSelector(store=>store.LoginReducer)
  console.log('jouidusekrni hai',uid)
  const {Name,Uid}=route.params;
  console.log('first',Name,Uid)
  //Uid jisse chat krni hai

  const [messages, setMessages] = useState([]);
//   const WIDTH = 200 // or any number
// const HEIGHT = 2000 // or any number

// const loadingWrapper = getByTestId(Test_ID.LOADING.WRAPPER)
// fireEvent(loadingWrapper, "layout", {
//   nativeEvent: {
//     layout: {
//       width: WIDTH,
//       height: HEIGHT,
//     },
//   },
// });
  useEffect(() => {
    setMessages([
   
    ])
  }, [])


  const onSend = (messagesArray:any) => {
    console.log('first439847348',messagesArray)
    const message=messagesArray[0]
    const mymessage={
      ...message,
      sentBy:uid,
      sentTo:Uid,
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages,mymessage ))
    const docid=Uid>uid?Uid+uid:uid+Uid
    firestore().collection('Chats').doc(docid).collection('messages').add(mymessage)
  }

  return (
    <View style={{flex:1}}>
      <Text>{Name}</Text>
       <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      user={{
        _id:uid,
      }}
    />
    </View>
   
  )
}
