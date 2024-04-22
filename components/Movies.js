import React, { useEffect, useState} from 'react'
import {getMovies} from '../firebase/endpoints/movies'
import { TouchableOpacity, View, ScrollView, Image, FlatList} from 'react-native'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
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

const Movies = ({ 
	label={id:'Ninguna',name:'Ninguna'}, 
	requestType = 'generic', 
	platform={id:'Ninguna',name:'Ninguna'}, 
	genre={id:'Ninguno',name:'Ninguno'}, 
	text='' }) => {
	const {height, width} = useStyles()
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
			prevState:[],
		}
		const {data, success, message} = await getMovies(options)
		setItem(data)
	}
	useEffect(() => {
		fetchData()
	}, [platform]);
	return (
		<View style={{paddingHorizontal:10}}>
			<Label>{text}</Label>
			{item?
			<FlatList 
				horizontal 
				data={item}
				keyExtractor={(movie, index)=> movie.id + index}
				renderItem ={({ item:movie})=>(
					<TouchableOpacity activeOpacity={0.5} onPress={() => {
						navigation.navigate("ViewMovie", {
							id: movie.id,
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
								uri: movie?.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : null,
							}}
						/>
						</View>
					</TouchableOpacity>
				)}
			/>:null}
		</View>
	)
}

export default Movies
