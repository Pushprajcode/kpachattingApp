import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../utiles/colors'
import Bubble from 'react-native-gifted-chat/lib/Bubble'

export default function Rendercolorbubble() {
  return(
    <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor:COLORS.LIGHT_GREEN
      }
    }}
  />

  )
    
}

const styles = StyleSheet.create({})