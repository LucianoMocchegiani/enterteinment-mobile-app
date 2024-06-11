import React, { useEffect } from 'react'
import { StatusBar, Dimensions } from 'react-native'
import {ActivityIndicator, StyleSheet, View, Alert} from 'react-native';
import { useAuth } from '../context/authContext';
import { useStorage } from '../context/storageContext';

const Splash = ({navigation}) => {

    const {user} = useAuth()
    const { handleSetUser } = useStorage()

    const checkUserStatus = async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        if (user) {
            try {
                const response = await handleSetUser();
                if (response.success) {
                    navigation.replace("Profiles");
                } else {
                    Alert.alert('Fallo de conexion', 'Verifique su conexion de internet y reinicie la app.');
                }
            } catch (error) {
                Alert.alert('Error', 'Ocurrió un error al cargar los datos del usuario.');
            }
        } else {
            navigation.replace("Login");
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