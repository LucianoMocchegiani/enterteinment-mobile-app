import React, { useEffect } from 'react'
import { StatusBar, Dimensions } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';

const Splash = ({navigation}) => {

    const {user} = useAuth()
    const { handleSetUser } = useStorage()
    
    const chargeUserStorage = async ()=>{
        if(user){
            const response =  await handleSetUser()
            if(response.success){
                return navigation.replace("Profiles");
            }else{
                return Alert.alert('Fallo de conexion','Verifique su conexion de internet y reinicie la app.')
            }
        }
    } 
    const redirectLogin = ()=>{
        if(!user){
            return navigation.replace("Login");
        }
    }

    useEffect(()=>{
        chargeUserStorage()
        redirectLogin ()
    },[user])

    return (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
             <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size={150} color={'black'}/>
            </View>
        </>
    )
}

export default Splash
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