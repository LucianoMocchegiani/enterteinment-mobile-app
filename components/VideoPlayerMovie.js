import { Video, ResizeMode } from 'expo-av';
import React, { useRef, useState, useEffect} from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import VideoControls from './VideoControls';
import * as NavigationBar from 'expo-navigation-bar';
import { useStyles } from '../context/stylesContext';
import { useStorage } from '../context/storageContext'
import VideoControlsMovie from './VideoControlsForMovies';

const VideoPlayerMovie = ({posterPatch, videoPatch='https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', data, id, fullscreen, setFullscreen})=> {
  const {height, width, vertical}=useStyles()
  const {setKeepWatchingMovies, getPositionMillisMovie, setPositionMillis,setDurationMillis, durationMillisRef, positionMillisRef, setMovieDataRef, movieDataRef}=  useStorage()
  const videoPlayerRef = useRef(null);
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ positionMillisState, setPositionMillisState ] = useState(0)
  const [ durationMillisState, setDurationMillisState ] = useState(0)
  
  useEffect(()=>{
    if(id){
      setStatusVideo(id)

    }
    return(()=>{
      handleReturn()
    })
  },[id])

  const handleReturn = async ()=>{
    let response = await updateStatusVideo(movieDataRef.current, positionMillisRef.current, durationMillisRef.current)
    setPositionMillis(0)
    setDurationMillis(0)
    setMovieDataRef(null)
    return response
  }

  const updateStatusVideo = async (data, positionMillis, durationMillis)=>{
    try{
      if(!data){return}
      const movie = {...data, positionMillis:positionMillis, durationMillis:durationMillis}
      let response = await setKeepWatchingMovies(movie)
      return response
    }catch(error){
      let response = { errorIn:'updateStatusVideo', message:error.message, success:false}
      console.log(response)
      return response
    }
  }

  const setStatusVideo = async (id)=>{
    try{
      if(!id){return}
      let positionMillis= getPositionMillisMovie(id)
      let status = await videoPlayerRef.current.getStatusAsync()
      let data = await videoPlayerRef.current.setStatusAsync({...status,...positionMillis})
      let response= {succes:true, data:data}
      return response
    }catch(error){
      let response = { errorIn:'setStatusVideo', message:error.message, success:false}
      console.log(response)
      return response
    }
  }

  const handleHideNavBarFunction = async ()=>{
    await NavigationBar.setBackgroundColorAsync('black')
    await NavigationBar.setButtonStyleAsync('dark')
  }

  const handleVisibleNavBarFunction = async ()=>{
    await NavigationBar.setBackgroundColorAsync('white')
    await NavigationBar.setButtonStyleAsync('dark')
  }

  const pauseVideo = () =>{
    if (videoPlayerRef.current) {
      videoPlayerRef.current.pauseAsync();
      handleVisibleNavBarFunction()
    }
  }

  const playVideo = ()=>{
    if (videoPlayerRef.current) {
      videoPlayerRef.current.playAsync();
      handleHideNavBarFunction()
    }
  }

  const onFullscreenToggle =()=>{
    if (videoPlayerRef.current) {
      setFullscreen(!fullscreen)
    }
  };

  const onRewind = async ()=>{
    if (videoPlayerRef.current) {
      const status = await videoPlayerRef.current.getStatusAsync();
      const newPosition = Math.max(status.positionMillis - 10000, 0); 
      await videoPlayerRef.current.setPositionAsync(newPosition);
    }
  };

  const onForward = async ()=>{
    if (videoPlayerRef.current) {
      const status = await videoPlayerRef.current.getStatusAsync();
      const newPosition = Math.max(status.positionMillis + 10000, 0); 
      await videoPlayerRef.current.setPositionAsync(newPosition);
    }
  };

  const handlePlaybackStatusUpdate = async (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      // Update UI for unloaded state
      if (playbackStatus.error) {
        console.error(`Encountered a fatal error during playback: ${playbackStatus.error}`);
      }
    } else {
      // Update UI for loaded state
      if (playbackStatus.isPlaying) {
        // Update UI for playing state
        setIsPlaying(true)
        setPositionMillisState(playbackStatus.positionMillis)
        setDurationMillisState(playbackStatus.durationMillis)
        setPositionMillis(playbackStatus.positionMillis)
        setDurationMillis(playbackStatus.durationMillis)
        if(data&&!movieDataRef.current){
          setMovieDataRef(data)
        }
      }else {
        setIsPlaying(false)
      }
    }
  };
  const setPosition = async ( position )=>{
    if (videoPlayerRef.current) {
      await videoPlayerRef.current.setPositionAsync(position);
    }
  }
 
  return (
    <>
      <View  style={!fullscreen?vertical?{...styles.container, width:width, backgroundColor:'black'}:{...styles.container, flex:1, backgroundColor:'black'}:vertical?{height:width*0.56, width:width*0.96 }:{height:Dimensions.get('window').height*0.80, width:width*0.96}}>
        <Video
          ref={videoPlayerRef}
          style={!fullscreen?vertical?{height:width*0.5, width:width*0.96}:{height:Dimensions.get('window').height*0.60, width:width*0.76}:vertical?{height:width*0.56, width:width*0.96}:{height:Dimensions.get('window').height*0.80, width:width*0.96}}
          source={{
            uri: videoPatch ,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.STRETCH}
          isLooping
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
        {!fullscreen?<VideoControls
          onFullscreen={()=>onFullscreenToggle()}
          fullscreen={fullscreen}
          onForward={onForward} 
          onRewind={onRewind} 
          onPlayPause={playVideo} 
          onPause={pauseVideo}
          isPlaying={isPlaying}
          positionMillis={positionMillisState}
          durationMillis={durationMillisState}
          setPosition={setPosition}
        />:  
        <>
          <VideoControlsMovie
            onFullscreen={()=>onFullscreenToggle()}
            fullscreen={fullscreen}
            onForward={onForward} 
            onRewind={onRewind} 
            onPlayPause={playVideo} 
            isPlaying={isPlaying}
            onPause={pauseVideo}
            positionMillis={positionMillisState}
            durationMillis={durationMillisState}
            setPosition={setPosition}
          />
        </>}
      </View>
    </>
  );
}

export default VideoPlayerMovie

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
  },
  containerFullscreen:{
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'black',
    zIndex:999
  },
  video: {
    width: 370,
    height: 200,
  },
  controlsFullscreen:{
    position:'absolute',bottom:30, right:0, left:0
  },
  controls:{
    justifyContent:'center', alignContent:'center'
  }
});
