import {Button, Dimensions, StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
// import Modal from 'react-native-modal';
import {normalize, vh, vw} from '../../utiles/dimensions';

export default function SettingsModal(props: any) {
  const {isModalVisible, setModalVisible} = props;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        height: vh(20),
      }}>
      <Modal visible={isModalVisible} transparent={true}>
        <View style={{flex: 1, marginTop: normalize(50)}}>
          <Text style={{color: 'black'}}>{'Logout'}</Text>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
