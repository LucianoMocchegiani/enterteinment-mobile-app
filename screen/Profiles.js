import React, { useState } from 'react'
import { View, Text, Alert, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { Feather } from '@expo/vector-icons'
import { useStorage } from '../context/storageContext';
import Loading from './Loading';
import AddProfile from '../components/AddProflie'
import { postProfile } from '../firebase/endpoints/profiles';
import { useStyles } from '../context/stylesContext';

const CardProfile =({profile, onPress})=>{
    return(
        <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center', alignItems:'center'}}>
            <TouchableOpacity 
                activeOpacity={0.5} 
                onPress={()=>onPress(profile.id)}>
            <Image style={{width:100, height:70, borderRadius:20}} resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }} />
            </TouchableOpacity>
            <Text style={{color:'white'}}>{profile.name}</Text>
        </View>
    )
}
const Profiles = ({navigation}) => {
    const  {height, width} = useStyles()
    const { logout }=useAuth()
    const { handleSetProfile, profiles, handleSetUser } = useStorage ()
    const [loading, setLoading] = useState(false)
    const [addModal, setAddModal] = useState(false)
    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    const handleLogout = async ()=>{
        try{
            const response = await logout()
            navigation.replace('Login')
            return response
        }
        catch(error){
            const response = {success:false, message:error.message}
            return response
        }

    }
    const selectProfile = async(id)=>{
        try{
            setLoading(true)
            const { success, message } = await handleSetProfile(id)
            if(success){
                setLoading(false)
                return navigation.replace('BottomStack')
            }else{
                setLoading(false)
                return Alert.alert('Hubo un problema', message)
            }
        }
        catch(error){
            setLoading(false)
            return Alert.alert('Hubo un problema', error.message)
        }
    }
    const addProfile = async (data)=>{
        try{
            setAddModal(false)
            setLoading(true)
            const { success, message } = await postProfile(data)
            if( success ){
                const response = await handleSetUser()
                if(response.success){
                    return setLoading(false)
                }else{
                    return navigation.replace('Profiles')
                }
            }else{
                setLoading(false)
                return Alert.alert('Hubo un problema', message)
            }

        }catch(error){
            setLoading(false)
            return Alert.alert('Hubo un problema', error.message)
        }
    }
    return fontsLoaded && (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            <Loading visible={loading}/>
            <AddProfile visible={addModal} submit={addProfile}/>
            <View style = {{flex:1, backgroundColor: '#000',  height:'auto', justifyContent:'center', alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                    {profiles.map((profile, index)=>{
                        return(
                           <CardProfile
                                key = {index}
                                profile = {profile}
                                onPress = {selectProfile}
                           />
                        )
                    }
                    )}
                    {profiles.length < 4 ?
                    <TouchableOpacity activeOpacity={0.5} onPress={()=>setAddModal(true)}>
                        <View style={{width:75 ,height:70 ,borderRadius:2, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}><Feather name='plus' size={50} color='black' /></View>
                    </TouchableOpacity>
                    : null}
                </View>
                <View style={{flexDirection:'col', justifyContent:'center', alignItems:'center' , alignContent:'center', marginTop:height*0.1}}>
                    <Text style={{color:'white', fontSize:20, marginBottom:20}}>Cerrar sesion</Text>
                    <TouchableOpacity activeOpacity={0.5} 
                        onPress={()=>handleLogout()}
                    >
                        <View style={{width:75 ,height:70 ,borderRadius:2, backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                            <MaterialIcons name="login" size={50} color={'black'}/>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Profiles
