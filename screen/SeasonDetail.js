import React, { Suspense } from 'react'
import { StatusBar, Dimensions, Text, ImageBackground, ScrollView, TouchableOpacity} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { getSeasonDetailFirebase } from '../firebase/endpoints/seasons'
import useSWR from 'swr'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import { Feather,  } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const {width, height} = Dimensions.get('window');

const Gradient = styled(LinearGradient)`
	height: 101%;
`
const EpisodeCard = ({episode, season_number, serie_id})=>{
	const navigation = useNavigation()
	return(
		<TouchableOpacity 
			style={{flexDirection:'row', backgroundColor:'#fff', width:'85%', height:32, borderRadius:2, justifyContent:'center', alignItems:'center', alignContent:'center', margin:10}}
			onPress={()=>navigation.navigate("ViewEpisode" , {
				episode_number: episode.episode_number,
                season_number: season_number,
                id: serie_id
			})}
		>
			<Text style={{fontSize:15, fontWeight:'bold', marginRight:20}}>{episode?.episode_number+'-  '+episode?.name}</Text>
			<Feather name='play' size={22} color='black' />
			<Text style={{fontSize:15, fontWeight:400, marginLeft:5}}>Reproducir</Text>
		</TouchableOpacity>
	)
}
const Detail = () =>{
	const navigation = useNavigation()
	const {params} =  useRoute()
	const {data} = useSWR(params.season_id, getSeasonDetailFirebase , {suspense: true})
	const season = data?.data
	return(
		<ScrollView style={{flex:1, backgroundColor:'#000',}} contentContainerStyle={{justifyContent:'flex-start', alignContent:'flex-start',alignItems:'center'}} >
			<Header login={true} goBack={navigation.goBack} />
				<ImageBackground style={{width:width, height:height*0.81}}source={{ uri: season?.poster_path?"https://image.tmdb.org/t/p/w500"+season.poster_path:null }}>
					<Gradient
						locations={[0, 0.2, 0.5, 0.94]}
						colors={[
							'rgba(0,0,0,0.5)',
							'rgba(0,0,0,0.0)',	
							'rgba(0,0,0,0.0)',
							'rgba(0,0,0,1)'
						]}>
					
					</Gradient>
					
				</ImageBackground>
				<Text style = {{fontSize:15, width:width*0.81, color:'white', fontFamily:'Montserrat_300Light', lineHeight:20, fontWeight:100, marginBottom:20}}>{season?.overview}</Text>
				<>
				{season?.episodes?.map((episode, i) =>{
					return(
						<EpisodeCard episode={episode} season_number={season?.season_number} serie_id={params.serie_id} key={i}/>
					)
				})}
				</>
		</ScrollView>
	)
}

const SeasonDetail =  () => {
	return (
		<>
			<StatusBar
				translucent
				backgroundColor='transparent'
				barStyle='light-content'
			/>
			<Suspense fallback={<Text>Cargando...</Text>}>
				<Detail/>
			</Suspense>		
		</>
	)
}

export default SeasonDetail

