import React, { useEffect } from 'react'
import { StatusBar, Dimensions, Touchable } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Reconnect= ({navigation}) => {

    const reconnect = async () => {
        navigation.replace("splash");
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
             <View style={[styles.container, styles.horizontal]}>
                <TouchableOpacity onPress={reconnect}><Icon name={'refresh'} color="#555" size={100}/></TouchableOpacity>
            </View>
        </>
    ) 
}

export default Reconnect

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