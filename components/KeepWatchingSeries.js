import React from 'react'
import { Dimensions, TouchableOpacity, View, FlatList, Image } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useStorage } from '../context/storageContext'
import { useStyles } from '../context/stylesContext'
const Label = styled.Text`
	color: #fff;
	font-weight: 700;
	font-size: 23px;
	margin-right: 10px;
	margin-top: 10px;
	margin-bottom: 15px;
	margin-left: 10px;
`

const MovieScroll = styled.ScrollView`
	padding-left: 10px;
`

const MoviePoster = styled.Image`
	width: ${Math.round((Dimensions.get('window').width * 35) / 100)}px;
	height: ${Math.round((Dimensions.get('window').width * 55) / 100)}px;
`

const MovieCard = styled.View`
	padding-right: 9px;
`

const KeepWatchingSeries = ()=>{
	const {keep_watching_series} = useStorage()
    const {height, width} = useStyles()
    const navigation = useNavigation()
	return (
        <>{keep_watching_series.length?<View style={{paddingHorizontal:10}}>
        <Label>Seguir viendo</Label>
        <FlatList 
            horizontal 
            data={keep_watching_series}
            keyExtractor={(serie, index)=> serie.id + index}
            renderItem ={({ item:serie})=>(
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    navigation.navigate("ViewEpisode", {
                        id: serie.serie_id,
                        season_number : serie.season_number?serie.season_number:null, 
                        episode_number : serie.episode_number?serie.season_number:null, 
                    })
                }}>
                    <View style={{paddingHorizontal:5}}>
                    <Image
                        style={{
                            width: width * 0.35,
                            height: width * 0.55,
                            maxWidth: 200,
                            maxHeight: 350,
                        }}
                        source={{
                            uri: serie?.still_path ? 'https://image.tmdb.org/t/p/w500' + serie.still_path : null,
                        }}
                    />
                    </View>
                </TouchableOpacity>    
            )}
        />
    </View>:null}</>
	)
}

export default KeepWatchingSeries
