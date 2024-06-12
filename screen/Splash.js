import React, { useEffect } from 'react'
import { StatusBar, Dimensions } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const Splash = ({navigation}) => {

    const { user, login } = useAuth()
    const { handleSetUser } = useStorage()

    const checkUserStatus = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            if (user) {
                const response = await handleSetUser();
                if (response.success) {
                    navigation.replace("Profiles");
                } else {
                    Alert.alert('Fallo de conexion', 'Verifique su conexion de internet y reinicie la app.');
                    navigation.replace("Reconect");
                }
            }else {
                let password = await AsyncStorage.getItem('password');
                let email = await AsyncStorage.getItem('email');
                console.log('pasword and email',password,' ',email)
                if(password&&email){
                    const response = await login(email, password)
                    if(!response.success){
                        Alert.alert('Fallo de conexion', 'Verifique su conexion de internet y reinicie la app.');
                        navigation.replace("Reconect");
                    }
                }else{
                    navigation.replace("Login");

                }
            };
        } catch (error) {
            Alert.alert('Error', error.message);
            navigation.replace("Reconect");
        }
    };

    useEffect(() => {
        checkUserStatus();
    }, [user]);
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
    ) }

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