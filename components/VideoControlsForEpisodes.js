import React ,{ useEffect, useState }from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, } from 'react-native';
import { AntDesign, MaterialIcons  } from '@expo/vector-icons';
import SelectComponent from '../components/Select'
import Slider from '@react-native-community/slider';
import { useStyles } from '../context/stylesContext';

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

const VideoControls = ({ isPlaying, onPlayPause, onRewind, onForward, size=24, season, episode, onFullscreen, fullscreen, onPause, durationMillis, positionMillis, setPosition}) => {
  const iconColor='white'
  const { width, vertical }= useStyles()
  const [ active, setActive ]= useState(true)
  const playActive = ()=>{
    onPlayPause()
    setTimeout(()=>{setActive(false)},2000)
  }
  const activeOn = ()=>{
    setActive(true)
    setTimeout(()=>{setActive(false)},9000)
  }
  return (
    <>
    {active?<><View style={{width:'100%', flexDirection:'col', justifyContent:'center', alignItems: 'center', position:'absolute', bottom:0, marginBottom:5}}>
        <View style={{ flexDirection: 'col', justifyContent:'space-between', width:'95%'}}>
           <Text style={{ color:'white', }}>{(positionMillis? (positionMillis / 1000 )/60:0).toFixed(2)}/{(durationMillis? (durationMillis / 1000 )/60:0).toFixed(2)}</Text>
           <Slider
             style={styles.slider}
             minimumValue={0}
             maximumValue={durationMillis || 0}
             value={positionMillis || 0}
             onSlidingComplete={async value => {
               await setPosition(value);
             }}
             minimumTrackTintColor="#1EB1FC"
             maximumTrackTintColor="#8B9CB6"
             thumbTintColor="#1EB1FC"
           />
        </View>
        <View style={{flexDirection: 'row', justifyContent:'space-between', width:'90%' }}>
            <TouchableOpacity style={styles.icon} onPress={() => onRewind(-10)}>
                <AntDesign name='banckward' size={size} color={iconColor}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={isPlaying?onPause:playActive}>
                <AntDesign name={isPlaying ? 'pausecircle':'caretright'} size={size} color={iconColor}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => onForward(10)}>
                <AntDesign name='forward' size={size} color={iconColor}/>
            </TouchableOpacity>
            {episode&&season?
            <>
                <Season serie_id={season.serie_id} array={season.array} setSelect={season.setSelect} select={season.select} season={season.season} setSeason={season.setSeason} fullscreen={fullscreen}/>
                <Episode serie_id={episode.episode_id} array={episode.array} setSelect={episode.setSelect} select={episode.select} episode={episode.episode} setEpisode={episode.setEpisode} fullscreen={fullscreen}/>
            </>:null}
            <TouchableOpacity style={styles.icon} onPress={onFullscreen}>
            <MaterialIcons name={fullscreen?'fullscreen-exit':'fullscreen'} size={size+5} color={iconColor}/>
          </TouchableOpacity>
        </View>
    </View>
    <TouchableOpacity style={ vertical?{position:'absolute', bottom:width*0.28, left:width*0.46}:{ position:'absolute', bottom:Dimensions.get('window').height*0.40, left:width*0.46} } onPress={isPlaying?onPause:playActive}>
        <AntDesign name={isPlaying ? 'pausecircle':'caretright'} size={size+10} color={iconColor}/>
    </TouchableOpacity>
    </>
    :<TouchableOpacity onPress={()=>activeOn()} style={vertical?{height:width*0.56, width:width*0.96, position:'absolute', bottom:0}:{height:Dimensions.get('window').height*0.80, width:width*0.96, position:'absolute', bottom:0}}></TouchableOpacity>}
    </>
  );
};

export default VideoControls;

const styles = StyleSheet.create({
    icon:{
      flexDirection:'row'
    },
    slider:{
      width:'100%',
    }
})