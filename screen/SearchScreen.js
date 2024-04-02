import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import Header from '../components/Header';
import {searchMoviesAlgolia} from '../firebase/endpoints/movies'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
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

const Container = styled.ScrollView`
	flex: 1;
    background-color: #000;
    min-height: ${(Dimensions.get('window').height)}px;
	height: auto;
`

const SearchBox = styled.View`
    width: 100%;
    height: 50px;
    background-color: #333333;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-left: 0px;
    padding-right: 7px;
    margin: 20px;
    margin-left: 5px;
`

const SearchInput = styled.TextInput`
    color: #fff;
    font-size: 16px;
    margin: 5px;
`

const SearchBoxWrapper = styled.View`
width: 100%;
justify-content: center;
margin-top: 5px;
`

const TopResultsText = styled.Text`
    color: white;
    font-size: 28px;
    margin: 20px;
    margin-top: 10px;
    margin-left: 25px;
    font-family: "Montserrat_600SemiBold";
    font-weight: 600;
`

const MoviePoster = styled.Image`
	width: ${Math.round((Dimensions.get('window').width * 28.5) / 100)}px;
	height: ${Math.round((Dimensions.get('window').width * 40.5) / 100)}px;
`

const MovieCard = styled.View`
	padding-right: 9px;
`

const ResultsWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: center;
    heigth:auto;
`

const SearchScreen = () => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState(null);
    const [results2, setResults2] = useState(null);

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

    useEffect(() => {
        console.log("-----------------------------")
        console.log(results)
    }, [results])

    return fontsLoaded && (
        <>
            <StatusBar style="light" />
            <Container>
                <Header login={true} goBack={navigation.goBack} />
                <SearchBoxWrapper>
                    <SearchBox>
                        <MaterialIcons name="search" size={30} color="#B1B1B1" style={{ margin: 10 }} />
                        <SearchInput value={search} onChangeText={(text) => setSearch(text)} placeholderTextColor="#7f7f7f" placeholder="Busca peliculas y series." />
                        <TouchableOpacity activeOpacity={0.5}>
                            <MaterialCommunityIcons name="microphone" size={30} color="#b1b1b1" style={{ margin: 10, }} />
                        </TouchableOpacity>
                    </SearchBox>
                </SearchBoxWrapper>
                {
                    results?.data && (
                        <>
                            <TopResultsText>Mas buscadas</TopResultsText>
                            <ResultsWrapper>
                                {results.data.map((movie, item) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                            navigation.navigate("ViewMovie", {
                                                id: movie.objectID,
                                            })
                                        }}>
                                            <MovieCard>
                                                <MoviePoster resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+ movie?.poster_path:null }} />
                                            </MovieCard>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ResultsWrapper>
                        </>
                    )
                }
            </Container>
        </>
    )
}

export default SearchScreen
