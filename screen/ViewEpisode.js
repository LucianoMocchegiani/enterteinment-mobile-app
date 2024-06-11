import React, { useState, useEffect } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import { getSerieDetail } from '../firebase/endpoints/series'
import { getEpisodeDetailFirebase, getEpisodeDetail } from '../firebase/endpoints/episodes'
import { getSeasonDetail } from '../firebase/endpoints/seasons'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
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
import CheckMyList from '../components/ChekMyListSerie'
import { STREAMING_MOVIES_URL, POSTER_PATCH_URL, STREAMING_SERIES_URL } from '@env';
import VideoPlayerEpisode from '../components/videoPlayerEpisode';
import { useStyles } from '../context/stylesContext';

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

const Episode = ({array, setSelect, select, episode, setEpisode, serie_id, fullscreen}) =>{
    
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
        const episodeData = await getEpisodeDetail(serie_id, select.season.season_number, select.episode.episode_number)
        const {success, message, data} = await getEpisodeDetailFirebase(episodeData.data?.id)
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
            icon={'book-play-outline'}
            small={fullscreen}
        />
    )
}

const Season = ({array, setSelect, select, season, setSeason, serie_id, fullscreen}) =>{
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
            icon={'book-play-outline'}
            small={fullscreen}
        />
    )
}

const ViewEpisode = ({ navigation }) => {
    const {params} =  useRoute()
    const {vertical}= useStyles()
    const [ fullscreen, setFullscreen ]= useState(false);
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

            <ScrollView style={{flex: 1, backgroundColor:'#000',}} contentContainerStyle={fullscreen?{ flexGrow: 1, justifyContent: 'center' }:{}}>
                <VideoPlayerEpisode
                    data={episode?.data}
                    posterPatch={state?.data?.poster_path?POSTER_PATCH_URL+state?.data?.poster_path:null}
                    videoPatch={'https://firebasestorage.googleapis.com/v0/b/entertainment-app-87f62.appspot.com/o/m-videos%2F'+1014590+'?alt=media&token=fb2e31d1-e141-4695-97e8-f184f5907fcd'}
                    // videoPatch={episode?.data?.firestore_url_video?STREAMING_SERIES_URL+'/'+episode.data.firestore_url_video:null}
                    id={episode?.data?.id}
                    episode={{serie_id:params?.id, array:season?.data?.episodes, setSelect:setSelect ,select:select, episode:episode, setEpisode:setEpisode}}
                    season={{serie_id:params?.id, array:state?.data?.seasons, setSelect:setSelect ,select:select, season:season, setSeason:setSeason}}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                />
                {!fullscreen?<View >
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
                    <CheckMyList serie={state.data}/>
                </MovieSubDetails>
                <View style={{flexDirection:'col',justifyContent:'center', alignItems: 'center', width:'100%'}}>
                    <Season serie_id={params?.id} array={state?.data?.seasons} setSelect={setSelect} select={select} season={season} setSeason={setSeason}/>
                    <Episode serie_id={params?.id} array={season?.data?.episodes} setSelect={setSelect} select={select} episode={episode} setEpisode={setEpisode}/>
                </View>
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
                </View>:null}
            </ScrollView>
        </>
    ) : (
            <ScrollView style={{flex: 1, backgroundColor:'#000',}} contentContainerStyle={fullscreen?{ flexGrow: 1, justifyContent: 'center' }:{}}/>
        )
}

export default ViewEpisode
