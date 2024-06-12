import React from 'react'
import { StatusBar } from 'react-native'
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
const Reconect = ({navigation}) => {

    return (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
             <View style={[styles.container, styles.horizontal]}>
                <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                    <MaterialIcons name='signal-wifi-statusbar-connected-no-internet-4' size={50} color='red'/>
                    <Text style={{marginLeft:10, fontWeight:600, fontSize:16}}>Verifique su conexion de internet</Text>
                </View>
                <TouchableOpacity
                    style={{justifyContent:'center', alignItems:'center'}}
                    onPress={()=>{navigation.replace("Splash")}}>
                    <MaterialCommunityIcons name='reload-alert' size={130} color='black' />
                    <Text style={{fontWeight:800, fontSize:16}}>Recargar</Text>
                </TouchableOpacity>
            </View>
        </>
    ) }

export default Reconect
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center'
    },
    horizontal: {
      flexDirection: 'col',
      justifyContent: 'center',
      padding: 10,
    },
});