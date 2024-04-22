import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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
import { getMovies } from '../firebase/endpoints/movies';
import { useStyles } from '../context/stylesContext'

const AllMovies = ({selectGenre, selectPlatform, selectLabel}) => {
    const { width, height }= useStyles()
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
    const [movies, setMovies] = useState([]);
	async function fetchData(){
		const options = {
			requestType:'genres', 
			platform:selectPlatform,
			genre:selectGenre,
			label:selectLabel,
			video:{id:'todas',name:'todas'},
			scroll:false, 
			setState:setMovies, 
			prevState:[],
		}
		const {data, success} = await getMovies(options)
		setMovies(data)
	}
    useEffect(() => {
        fetchData()
    }, [selectGenre, selectPlatform])

    return fontsLoaded && (
        <>
            <ScrollView style={{flex:1 , backgroundColor:'#000'}} >
                {
                    movies && (
                        <>
                            <View style={{flexWrap:'wrap', flexDirection:'row', padding:10, height:'auto', justifyContent:'center', width:width}}>
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
                                {movies.map((movie, item) => {
                                    return (
                                        <TouchableOpacity activeOpacity={0.5} key={item} onPress={() => {
                                            navigation.navigate("ViewMovie", {
                                                id: movie.id,
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

export default AllMovies 
