import React, { useEffect, useState} from 'react'
import {getMovies} from '../firebase/endpoints/movies'
import { Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'

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

const Movies = ({ 
	label={id:'ninguna',name:'ninguna'}, 
	requestType = 'generic', 
	platform={id:'ninguna',name:'ninguna'}, 
	genre={id:'ninguna',name:'ninguna'}, text='' }) => {
	const [item, setItem] = useState([]);
	const navigation = useNavigation();
	async function fetchData(){
		const options = {
			requestType:requestType, 
			platform:platform,
			genre:genre,
			label:label,
			video:{id:'todas',name:'todas'},
			scroll:false, 
			setState:setItem, 
			prevState:item,
		}
		let responce = await getMovies(options)
		console.log(responce)
	}
	useEffect(() => {
		fetchData()
	}, []);

	return (
		<Container>
			<Label>{text}</Label>
			{item?
			<MovieScroll horizontal>
				{item.map((movie, index) => {
					return (
						<TouchableOpacity activeOpacity={0.5} key={movie.id+index} onPress={() => {
							navigation.navigate("ViewMovie", {
								id: movie.id,
							})
						}}>
							<MovieCard>
								<MoviePoster resizeMode='cover' source={{ uri: movie?.poster_path?"https://image.tmdb.org/t/p/w500"+movie.poster_path:null }} />
							</MovieCard>
						</TouchableOpacity>
					)
				})}
			</MovieScroll>:null}
		</Container>
	)
}

export default Movies
