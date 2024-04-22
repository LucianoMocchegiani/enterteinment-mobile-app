import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
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
import { useStorage } from '../context/storageContext'
import { useStyles } from '../context/stylesContext'

const Warning = styled.Text`
    color: #fff;
    font-family: "Montserrat_400Regular";
    font-size: 23px;
    text-align: center;
`

const WarningButton = styled.TouchableOpacity`
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    margin: 10px;
`

const WarningButtonText = styled.Text`
    color: black;
    font-family: "Montserrat_300Light";
    font-weight:800;
    font-size: 15px;
`

const WarningWrapper = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    
`

const MyList = () => {
    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });
    const {height, width} = useStyles()
    const {my_list_movies, my_list_series} = useStorage()
    const navigation = useNavigation();

    return fontsLoaded && (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
            <ScrollView style={{flex:1 , backgroundColor:'#000'}} >
               
                <Header login={true} goBack={navigation.goBack} label="Mi lista" />
                {
                    (my_list_movies?.length == 0 && my_list_series?.length == 0) ?(
                        <WarningWrapper>
                            <Warning>No hay nada en tu lista..</Warning>
                            <WarningButton activeOpacity={0.5} onPress={() => navigation.goBack()}><WarningButtonText>Busca nuevo contenido</WarningButtonText></WarningButton>
                        </WarningWrapper>
                    )
                :
                <>
                <View style={{flexWrap:'wrap', width:width, margin:20}}>
                    {my_list_movies?.map((movie, item) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                navigation.navigate("ViewMovie", {
                                    id: movie.id,
                                })
                            }}>
                                <View style={{paddingHorizontal:5}}>
                                    <Image style={{width:width*0.3, height:width*0.45, maxWidth:200, maxHeight:350, borderRadius:10}} resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+movie.poster_path:null }} />
                                </View >
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={{flexWrap:'wrap', width:width, margin:20, flexDirection:'row'}}>
                    {my_list_series?.map((movie, item) => {
                         return (
                            <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                navigation.navigate("ViewMovie", {
                                    id: movie.id,
                                })
                            }}>
                                <View style={{paddingHorizontal:5}}>
                                    <Image style={{width:width*0.3, height:width*0.45, maxWidth:200, maxHeight:350, borderRadius:10}} resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+movie.poster_path:null }} />
                                </View >
                            </TouchableOpacity>
                        )
                    })}
                </View></>}
            </ScrollView>
        </>
    )
}

export default MyList
