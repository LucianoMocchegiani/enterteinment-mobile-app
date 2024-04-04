import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
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
import { getSeries } from '../firebase/endpoints/series';
const Container = styled.ScrollView`
	flex: 1;
    background-color: #000;
    min-height: ${(Dimensions.get('window').height)}px;
	height: auto;
`

const SeriePoster = styled.Image`
	width: ${Math.round((Dimensions.get('window').width * 28.5) / 100)}px;
	height: ${Math.round((Dimensions.get('window').width * 40.5) / 100)}px;
`

const SerieCard = styled.View`
	padding-right: 9px;
`

const ResultsWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: center;
    heigth:auto;
`

const AllSeries = ({selectGenre, selectPlatform, selectLabel}) => {
    const navigation = useNavigation();
    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });
    const [series, setSeries] = useState([]);
	async function fetchData(){
		const options = {
			requestType:'genres', 
			platform:selectPlatform,
			genre:selectGenre,
			label:selectLabel,
			video:{id:'todas',name:'todas'},
			scroll:false, 
			setState:setSeries, 
			prevState:[],
		}
		const {data, success} = await getSeries(options)
		setSeries(data)
	}
    useEffect(() => {
        fetchData()
    }, [selectGenre, selectPlatform])

    return fontsLoaded && (
        <>
            <Container>
                {
                    series && (
                        <>
                            <ResultsWrapper>
                            {/* <FlatList
                                onScrollEndDrag={() => onScrollFunction()}
                                style={styles.container}
                                data={data}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => {
                                return (
                                    <CardProduct 
                                        key={item.id}
                                        category={item.category_id}
                                        image={item.image}
                                        name={item.name}
                                        description={item.description}
                                        type={item.type}
                                        stock={item.stock}
                                        price={item.dolar_price}
                                        product={item}
                                        navigation = {navigation}
                                        discount ={discount}

                                    />
                                );
                                }}
                            /> */}
                                {series.map((serie, item) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                            navigation.navigate("ViewSerie", {
                                                id: serie.id,
                                            })
                                        }}>
                                            <SerieCard>
                                                <SeriePoster resizeMode='cover' source={{ uri: serie?.poster_path?"https://image.tmdb.org/t/p/w500"+ serie?.poster_path:null }} />
                                            </SerieCard>
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

export default AllSeries
