import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRef } from 'react'
import Child from './child'

export default function Parent() {
    const childCompRef = useRef()
  return (
    <View>
        <TouchableOpacity>
        <Text>{'clickhere'}</Text>
        </TouchableOpacity>
        <Child ref={childCompRef}/>
        
    
    </View>
  )
}

const styles = StyleSheet.create({})