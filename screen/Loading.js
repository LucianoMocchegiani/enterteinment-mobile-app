import React from 'react'
import { StatusBar, Dimensions } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Modal, SafeAreaView} from 'react-native';

const Loading = ({visible=true}) => {

    return (
        <>
            <Modal visible={visible} animationType="slide">
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size={150} color={'black'}/>
                </View>
            </Modal>
        </>
    )
}

export default Loading
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });