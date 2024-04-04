import React from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { useStorage } from '../context/storageContext'
const Container = styled.View`
	padding: 20px 0;
`

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
    const navigation = useNavigation()
	return (
		<>{keep_watching_series.length?
            <Container>
                <Label>Seguir viendo</Label>
                <MovieScroll horizontal>
                    {keep_watching_series.map((movie, index) => {
                        return (
                            <TouchableOpacity activeOpacity={0.5} key={movie.id+index} onPress={() => {
                                navigation.navigate("ViewEpisode", {
                                    id: movie.id,
                                })
                            }}>
                                <MovieCard>
                                    <MoviePoster resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+movie.poster_path:null }} />
                                </MovieCard>
                            </TouchableOpacity>
                        )
                    })}
                </MovieScroll>
		    </Container>
            :null}
        </>
        
	)
}

export default KeepWatchingSeries
