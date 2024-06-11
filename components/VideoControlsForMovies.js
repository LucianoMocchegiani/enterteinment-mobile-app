import React ,{ useState }from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, } from 'react-native';
import { AntDesign, MaterialIcons  } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useStyles } from '../context/stylesContext';

const VideoControls = ({ isPlaying, onPlayPause, onRewind, onForward, size=24, onFullscreen, fullscreen, onPause, durationMillis, positionMillis, setPosition}) => {
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