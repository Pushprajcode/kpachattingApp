import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TopTabCategoryFn from '../../router/toptabnavigation'

export default function HomeScreen() {
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.headerView}>
        <Text>
          {"KPA Chat"}
        </Text>
      </View>
  <TopTabCategoryFn/>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerView: {
    height: 50,
    backgroundColor: "green",
    justifyContent:'center'
  },
})


