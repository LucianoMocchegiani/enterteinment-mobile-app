import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image, TextInput, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Header from '../components/Header';
import {searchMoviesAlgolia} from '../firebase/endpoints/movies'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { useStyles } from '../context/stylesContext'

const SearchScreen = () => {
    const { width, height }= useStyles()
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });
    const handleSearch = async (search) =>{
        const response = await searchMoviesAlgolia(search)
        setResults(response)
    }

    useEffect(() => {
        handleSearch(search)
    }, [search])

    return fontsLoaded && (
        <>
            <StatusBar style="light" />
            <ScrollView style={{flex:1 , backgroundColor:'#000'}} >
                <Header login={true} goBack={navigation.goBack} />
                <View style={{width:width, justifyContent:'center', marginTop:5}}>
                    <View style={{width:width, height:50, backgroundColor:'#333333', justifyContent:'center', alignItems:'center', flexDirection:'row', paddingLeft:0, paddingRight:7, margin:20 }}>
                        <MaterialIcons name="search" size={30} color="#B1B1B1" style={{ margin: 10 }} />
                        <TextInput style={{color:'#fff', fontSize:16, margin:5}} value={search} onChangeText={(text) => setSearch(text)} placeholderTextColor="#7f7f7f" placeholder="Busca peliculas y series." />
                        <TouchableOpacity activeOpacity={0.5}>
                            <MaterialCommunityIcons name="microphone" size={30} color="#b1b1b1" style={{ margin: 10, }} />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    results?.data && (
                        <>
                            <Text style={{color:'#fff', fontSize:20, margin:20, fontFamily:'Montserrat_600SemiBold', fontWeight:600}}>Mas buscadas</Text>
                            <View style={{flexWrap:'wrap', flexDirection:'row', padding:10, height:'auto', justifyContent:'center', width:width}}>
                                {results.data.map((movie, item) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                            navigation.navigate("ViewMovie", {
                                                id: movie.objectID,
                                            })
                                        }}>
                                            <View style={{paddingHorizontal:5}}>
                                                <Image style={{width:width*0.28, height:width*0.4, maxHeight:350, maxWidth:200}} resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+ movie?.poster_path:null }} />
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </>
                    )
                }
            </ScrollView>
        </>
    )
}

export default SearchScreen
