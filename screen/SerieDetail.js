import React, { Suspense } from 'react'
import { StatusBar, Dimensions, Text, ImageBackground, ScrollView, TouchableOpacity  } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import styled from 'styled-components/native'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { getSerieDetail } from '../firebase/endpoints/series'
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
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
const {width, height} = Dimensions.get('window');

const Gradient = styled(LinearGradient)`
	height: 101%;
`
const Tags = styled.View`
    flex-direction: row;
    justify-content: center;
    margin: 10px 0 5px 3px;
    align-items: center;
    flex-wrap: wrap;
    width: 99%;
`
const TagWrapper = styled.View`
    flex-direction: row;
    align-items: center;
`
const Tag = styled.Text`
    color: #fff;
    font-family: "Montserrat_400Regular";
`
const TagDot = styled.View`
    margin: 10px;
    background-color: white;
    height: 2px;
    width: 2px;
`
const SeasonCard = ({season, serie_id})=>{
	const navigation = useNavigation()
	return(
		<TouchableOpacity 
			style={{flexDirection:'row', backgroundColor:'#fff', width:'85%', height:32, borderRadius:2, justifyContent:'center', alignItems:'center', alignContent:'center', margin:10}}
			onPress={()=>navigation.navigate("SeasonDetail" , {
				serie_id: serie_id,
				season_id: season?.id
			})}
		>
			<Text style={{fontSize:15, fontWeight:'bold', marginRight:20}}>{season?.season_number+'-  '+season?.name}</Text>
			<Feather name='info' size={22} color='black' />
			<Text style={{fontSize:15, fontWeight:400, marginLeft:5}}>Info</Text>
		</TouchableOpacity>
	)
}
const Detail = () =>{
	const navigation = useNavigation()
	const {params} =  useRoute()
	const {data} = useSWR(params.id, getSerieDetail, {suspense: true})
	const serie = data?.data
	return(
		<ScrollView style={{flex:1, backgroundColor:'#000',}} contentContainerStyle={{justifyContent:'flex-start', alignContent:'flex-start',alignItems:'center'}} >
			<Header login={true} goBack={navigation.goBack} />
				<ImageBackground style={{width:width, height:height*0.81}}source={{ uri: serie?.poster_path?"https://image.tmdb.org/t/p/w500"+serie.poster_path:null }}>
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
				<Tags>
                    {
                        serie?.genres.map((genre, i) => {
                            if (i + 1 ==  serie?.genres.length) {
                                return (
                                    <TagWrapper key={i}>
                                        <Tag>{genre.name}</Tag>
                                    </TagWrapper>
                                )
                            } else {
                                return (
                                    (
                                        <TagWrapper key={i}>
                                            <Tag>{genre.name}</Tag>
                                            <TagDot />
                                        </TagWrapper>
                                    )
                                )
                            }
                        })
                    }
                </Tags>
				<Text style = {{fontSize:15, width:width*0.81, color:'white', fontFamily:'Montserrat_300Light', lineHeight:20, fontWeight:100, marginBottom:20}}>{serie?.overview}</Text>
				<>
				{serie?.seasons?.map((season, i) =>{
					return(
						<SeasonCard season={season} serie_id={params.id} key={i}/>
					)
				})}
				</>
		</ScrollView>
	)
}

const SerieDetail =  () => {
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

export default SerieDetail

