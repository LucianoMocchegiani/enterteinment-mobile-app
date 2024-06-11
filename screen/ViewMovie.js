import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { getMovieDetail, getMovieDetailFirebase } from '../firebase/endpoints/movies'
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import CheckMyList from '../components/CheckMyListMovie'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";
import VideoPlayerMovie from '../components/VideoPlayerMovie'
import { useStyles } from '../context/stylesContext';
import { STREAMING_MOVIES_URL, POSTER_PATCH_URL } from '@env';
const Container = styled.View`
	flex: 1;
	background-color: #000;
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

const ViewMovie = ({ navigation }) => {
    const {params} =  useRoute()
    const {vertical}= useStyles()
    const [ fullscreen, setFullscreen ]= useState(false);
    const [loading, setLoading] = useState(false)

    const [state, setState]= useState({
        success: null,
        message: null,
        data: null
    })

    const handleSetState = async ()=>{
        const {success, message, data} = await getMovieDetailFirebase(params?.id)
        setState({
            success: success,
            message: message,
            data: data
        })
    }

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });
    useEffect(()=>{
        handleSetState()
    },[])

    return fontsLoaded && !loading ? (
        <>
            <StatusBar
                translucent
                backgroundColor='transparent'
                barStyle='light-content'
            />
           <ScrollView style={{flex: 1, backgroundColor:'#000',}} contentContainerStyle={fullscreen?{ flexGrow: 1, justifyContent: 'center' }:{}}>
                {!fullscreen&&<Header login={true} goBack={navigation.goBack} />}
                <VideoPlayerMovie 
                    data={state?.data}
                    posterPatch={state?.data?.poster_path?POSTER_PATCH_URL+state?.data?.poster_path:null}
                    videoPatch={'https://firebasestorage.googleapis.com/v0/b/entertainment-app-87f62.appspot.com/o/m-videos%2F'+1014590+'?alt=media&token=fb2e31d1-e141-4695-97e8-f184f5907fcd'}
                    // videoPatch={state?.data?.firestore_url_video?STREAMING_MOVIES_URL+'/'+state.data.firestore_url_video:null}
                    id={state?.data?.id}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                />
                {!fullscreen?
                <View>
                    <Title>{state?.data?.title}</Title>
                    <MovieSubDetails>
                        <MovieBadge>13+</MovieBadge>
                        <Subtitle>{state?.data?.release_date}</Subtitle>
                        <CheckMyList movie={state.data}/>
                    </MovieSubDetails>
                    <MovieDescription>
                        {state?.data?.overview}
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
        <ScrollView style={{flex: 1, backgroundColor:'#000'}}/>
    )
}

export default ViewMovie
