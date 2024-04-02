import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { getSerieDetail } from '../firebase/endpoints/series'
import { getEpisodeDetail } from '../firebase/endpoints/episodes'
import { getSeasonDetail } from '../firebase/endpoints/seasons'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import { Video } from 'expo-av';
import { useAuth } from '../context/authContext'
import { useRoute } from '@react-navigation/native'
import SelectComponent from '../components/Select'
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
const Container = styled.ScrollView`
	flex: 1;
	background-color: #000;
    min-height: ${(Dimensions.get('window').height)}px;
	height: auto;
`

const HeaderIcons = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const Title = styled.Text`
    color: white;
    font-size: 24px;
    margin: 10px;
    font-family: "Montserrat_700Bold"
`

const MovieBadge = styled.Text`
    color: #a2a2a2;
    background-color: #373737;
    padding: 2px;
    border-radius: 5px;
    width: 38px;
    text-align: center;
    margin: 15px;
`

const Subtitle = styled.Text`
    color: #a2a2a2;
    margin: 5px;
`

const MovieSubDetails = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: -17px;
`
const Button = styled.TouchableOpacity`
	align-items: center;
`
const TextButton = styled.Text`
	color: #fff;
	font-size: 13px;
	margin-top: 3px;
`
const Play = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #fff;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
    justify-content: center;
    margin: 10px;
`

const TextButtonPlay = styled.Text`
	font-size: 15px;
	font-weight: bold;
	padding-left: 5px;
`

const Download = styled.TouchableOpacity`
	flex-direction: row;
	background-color: #262626;
	width: 95%;
	height: 32px;
	border-radius: 2px;
	align-items: center;
	justify-content: center;
`

const TextButtonDownload = styled.Text`
	font-size: 15px;
    font-weight: 700;
    color: white;
    padding-left: 5px;
`

const ActionButtons = styled.View`
    flex-direction: column;
    width: 100%;
    align-items: center;
`

const MovieDescription = styled.Text`
    color: white;
    width: 98%;
    margin-left: 10px;
    margin: 10px;
    font-weight: 100;
    font-family: "Montserrat_300Light";
    line-height: 20px;
    margin-top: 25px;
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

const ActionButtons2 = styled.View`
    flex-direction :row;
    justify-content: center;
    margin: 20px;
    align-items: center;
`

const ActionButton = styled.TouchableOpacity`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px;
    margin-top: 20px;
`

const ActionButtonLabel = styled.Text`
    color: white;
    font-family: "Montserrat_300Light";
    font-size: 15px;
`

const Episode = ({array, setSelect, select, episode, setEpisode, serie_id}) =>{
    const handleSelectEpisode = (e)=>{
        setSelect({
            ...select,
            episode: {
                episode_number: e.episode_number,
                name: e.name
            }
        })
    }
    const handleSetEpisode= async ()=>{
        const {success, message, data} = await getEpisodeDetail(serie_id, select.season.season_number, select.episode.episode_number)
        setEpisode({
            ...episode,
            success: success, 
            message: message,
            data: data
        })
    } 
    useEffect(()=>{
        handleSetEpisode()
    },[select.episode, select.season])

    return(
        <SelectComponent
            text={'Capitulo'}
            objValue='name'
            objkey='episode_number'
            arraySelects={array}
            selectFunction={handleSelectEpisode}
            selected={episode?.data?episode.data:''}
        />
    )
}


const Season = ({array, setSelect, select, season, setSeason, serie_id}) =>{
    const handleSelectSeason = (e)=>{
        setSelect({
            episode:{
                episode_number: season?.data?.episodes[0]?.episode_number,
                name: null},
            season: {
                season_number: e.season_number,
                name: e.name
            }
        })
    }
    const handleSetSeason= async ()=>{
        const {success, message, data} = await getSeasonDetail(serie_id, select.season.season_number)
        setSeason({
            ...season,
            success: success, 
            message: message,
            data: data
        })
    } 
    useEffect(()=>{
        handleSetSeason()
    },[select.season])
    return(
        <SelectComponent
            text={'Temporada'}
            objValue='name'
            objkey='season_number'
            arraySelects={array}
            selectFunction={handleSelectSeason}
            selected={season?.data?season.data:''}
        />
    )
}

const ViewEpisode = ({ navigation }) => {
    const {user} = useAuth()
    const {params} =  useRoute()
    const [state, setState]= useState({
        success: null, 
        message: null,
        data: null
    })
    const [select, setSelect] = useState({
        season: {season_number: 1, name:null},
        episode: {episode_number: 1, name:null},
    })
    const [season, setSeason]= useState({
        success: null, 
        message: null,
        data: null
    })
    const [episode, setEpisode]= useState({
        success: null, 
        message: null,
        data: null
    })
    const handleSetState = async ()=>{
        const {success, message, data} = await getSerieDetail(params?.id)
        setState({
            success: success, 
            message: message,
            data: data
        })
    }
    
    useEffect(()=>{
        if(!state.success){
            handleSetState()
        }
        setSelect({
            season: {season_number: params?.season_number? params.season_number : 1, name:null},
            episode: {episode_number: params?.episode_number? params.episode_number : 1, name:null},
        })
    },[params])

    const [loading, setLoading] = useState(false)

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    return fontsLoaded && !loading ? (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />

            <Container>
                <Header login={true} goBack={navigation.goBack} />
                <Video
                    source={{
                        uri: `https://firebasestorage.googleapis.com/v0/b/entertainment-app-87f62.appspot.com/o/s-videos%2F${episode?.data?.id}?alt=media&token=6bf5d8cf-f5e3-4bcb-bdaa-0af7aee9f8db`
                    }}
                    isMuted={false}
                    useNativeControls={false}
                    shouldPlay={true}
                    style={{ height: 225, marginTop: 15 }}
                    resizeMode="contain"
                    usePoster={true}
                    posterSource={{ uri: state?.data?.poster_path?"https://image.tmdb.org/t/p/w500"+ season?.data?.poster_path:null }}
                    useNativeControls={true}
                />  
                <Title>{state?.data?.title}</Title>
                <MovieSubDetails>
                    <MovieBadge>13+</MovieBadge>
                    <Subtitle>{state?.data?.release_date}</Subtitle>
                    <Button 
                        activeOpacity={0.5}
                        onPress={()=>navigation.navigate("SerieDetail" , {
                            id: params?.id,
                        })}>
					    <Feather name='info' size={22} color='#FFF' />
					    <TextButton>Info</TextButton>
				    </Button>
                </MovieSubDetails>
                <ActionButtons>
                    <Play activeOpacity={0.5}>
                        <Feather name='play' size={22} color='black' />
                        <TextButtonPlay>Play</TextButtonPlay>
                    </Play>
                    <Season serie_id={params?.id} array={state?.data?.seasons} setSelect={setSelect} select={select} season={season} setSeason={setSeason}/>
                    <Episode serie_id={params?.id} array={season?.data?.episodes} setSelect={setSelect} select={select} episode={episode} setEpisode={setEpisode}/>
                </ActionButtons>
                <MovieDescription>
                    {episode?.data?.overview}
                </MovieDescription>
                <Tags>
                    {
                        state?.data?.genres.map((genre, i) => {
                            if (i + 1 == state?.data?.genres.length) {
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
                
                <ActionButtons2>
                    {/* {
                        movie && user?.list.includes(movie.id) ? (
                            <ActionButton activeOpacity={0.5} onPress={() => {
                                console.log('funcion api my list delete')
                            }}>
                                <Feather name="check" size={35} color="white" />
                                <ActionButtonLabel>My List</ActionButtonLabel>
                            </ActionButton>
                        ) : (
                                <ActionButton activeOpacity={0.5} onPress={() => {
                                  console.log('funcion api add my list')

                                }}>
                                    <Ionicons name="add-outline" size={35} color="white" />
                                    <ActionButtonLabel>My List</ActionButtonLabel>
                                </ActionButton>
                            )
                    } */}
                    {/* <ActionButton activeOpacity={0.5}>
                        <AntDesign name="like2" size={30} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Rate</ActionButtonLabel>
                    </ActionButton> */}
                    {/* <ActionButton activeOpacity={0.5}>
                        <AntDesign name="sharealt" size={27} color="white" style={{ marginBottom: 7 }} />
                        <ActionButtonLabel>Share</ActionButtonLabel>
                    </ActionButton> */}
                </ActionButtons2>
            </Container>
        </>
    ) : (
            <Container />
        )
}

export default ViewEpisode
